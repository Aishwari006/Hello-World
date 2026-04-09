const mongoose = require('mongoose');
const ScamSession = require('../models/scamSession');
const { generateScammerResponse } = require('../services/geminiService');
const { validateMessageInput } = require('../utils/validator');

const MAX_TURNS = 20;

const PRAISE_MESSAGE =
  "🛡️ Excellent work! You've resisted 3 scam attempts without giving in. That's exactly the kind of caution that keeps people safe.";

const STARTER_SCAMS = {
  bank_impersonation:
    'Hello ma’am, this is the bank security team. We’ve detected suspicious activity on your account. Please verify your identity immediately to prevent your account from being frozen.',
  delivery_fraud:
    'Hello, your parcel delivery has been placed on hold due to an address verification issue. Please confirm your details now to avoid cancellation.',
  tech_support:
    'Hello, this is Microsoft support. Your device has been flagged for suspicious activity. Please confirm if you are near your computer so we can help secure it.',
  relational_scam:
    'Hi… I know this may seem sudden, but I really trust you. I’m in a difficult situation right now and need your help urgently.',
};

function pickScamType(requestedType) {
  const allowed = Object.keys(STARTER_SCAMS);

  if (requestedType && allowed.includes(requestedType)) {
    return requestedType;
  }

  const randomIndex = Math.floor(Math.random() * allowed.length);
  return allowed[randomIndex];
}

/**
 * POST /api/scam-sessions/start
 */
const startSession = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const requestedScamType = req.body?.scamType;
    const scamType = pickScamType(requestedScamType);
    const initialMessage = STARTER_SCAMS[scamType];

    const newSession = await ScamSession.create({
      user: userId,
      scamType,
      state: 'scamming',
      messages: [
        {
          role: 'model',
          parts: [{ text: initialMessage }],
        },
      ],
      trapAttempts: 1,
      successfulDefenses: 0,
      appreciatedAt3: false,
      resultReason: 'Session started',
      riskScore: 10,
      isCompleted: false,
      turnCount: 0,
      lastAiMeta: {
        state: 'scamming',
        scamType,
        confidence: 1,
        userAction: 'neutral',
        trapAttemptDetected: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Scam simulation session started.',
      session: {
        id: newSession._id,
        scamType: newSession.scamType,
        state: newSession.state,
        isCompleted: newSession.isCompleted,
        turnCount: newSession.turnCount,
        trapAttempts: newSession.trapAttempts,
        successfulDefenses: newSession.successfulDefenses,
        latestReply: initialMessage,
        messages: newSession.messages,
      },
    });
  } catch (error) {
    console.error('Start Session Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to start scam session.',
    });
  }
};

/**
 * POST /api/scam-sessions/:sessionId/message
 */
const sendMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { sessionId } = req.params;
    const { message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid session ID.',
      });
    }

    const validated = validateMessageInput(message);
    if (!validated.valid) {
      return res.status(400).json({
        success: false,
        error: validated.error,
      });
    }

    const userMessageText = validated.value;

    // Find session AND validate ownership
    const session = await ScamSession.findOne({
      _id: sessionId,
      user: userId,
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found.',
      });
    }

    if (session.isCompleted) {
      return res.status(400).json({
        success: false,
        error: 'This session has already ended.',
      });
    }

    if (session.turnCount >= MAX_TURNS) {
      session.isCompleted = true;
      session.state = 'defended';
      session.resultReason = 'Maximum turns reached';
      await session.save();

      return res.status(400).json({
        success: false,
        error: 'Maximum turns reached. Session ended.',
      });
    }

    // Send ONLY visible history to Gemini
    const aiResponse = await generateScammerResponse(session.messages, userMessageText);

    // Decide final session completion
    let finalState = aiResponse.state;
    let isCompleted = false;

    if (
      aiResponse.state === 'compromised' ||
      aiResponse.state === 'defended' ||
      session.turnCount + 1 >= MAX_TURNS
    ) {
      isCompleted = true;

      if (session.turnCount + 1 >= MAX_TURNS && aiResponse.state === 'scamming') {
        finalState = 'defended';
      }
    }

    // Determine increments
    const successfulDefenseIncrement = aiResponse.userAction === 'resisted' ? 1 : 0;
    const trapAttemptIncrement = aiResponse.trapAttemptDetected ? 1 : 0;

    // Compute praise BEFORE update
    const newSuccessfulDefenses = session.successfulDefenses + successfulDefenseIncrement;
    const shouldTriggerPraise = newSuccessfulDefenses >= 3 && !session.appreciatedAt3;

    // Atomic update
    const updatedSession = await ScamSession.findOneAndUpdate(
      { _id: sessionId, user: userId, isCompleted: false },
      {
        $push: {
          messages: {
            $each: [
              { role: 'user', parts: [{ text: userMessageText }] },
              { role: 'model', parts: [{ text: aiResponse.message }] },
            ],
          },
        },
        $inc: {
          turnCount: 1,
          ...(successfulDefenseIncrement ? { successfulDefenses: successfulDefenseIncrement } : {}),
          ...(trapAttemptIncrement ? { trapAttempts: trapAttemptIncrement } : {}),
        },
        $set: {
          state: finalState,
          scamType: aiResponse.scamType || session.scamType,
          resultReason: aiResponse.resultReason,
          riskScore: aiResponse.riskScore,
          isCompleted,
          ...(shouldTriggerPraise ? { appreciatedAt3: true } : {}),
          lastAiMeta: {
            state: finalState,
            scamType: aiResponse.scamType || session.scamType,
            confidence: aiResponse.confidence,
            userAction: aiResponse.userAction,
            trapAttemptDetected: aiResponse.trapAttemptDetected,
          },
        },
      },
      { new: true }
    );

    if (!updatedSession) {
      return res.status(409).json({
        success: false,
        error: 'Session was updated elsewhere or already ended.',
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        sessionId: updatedSession._id,
        reply: aiResponse.message,
        state: updatedSession.state,
        scamType: updatedSession.scamType,
        riskScore: updatedSession.riskScore,
        turnCount: updatedSession.turnCount,
        trapAttempts: updatedSession.trapAttempts,
        successfulDefenses: updatedSession.successfulDefenses,
        isCompleted: updatedSession.isCompleted,
        showPraiseBanner: shouldTriggerPraise,
        praiseMessage: shouldTriggerPraise ? PRAISE_MESSAGE : null,
        resultReason: updatedSession.resultReason,
        messages: updatedSession.messages,
      },
    });
  } catch (error) {
    console.error('Send Message Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process message.',
    });
  }
};

/**
 * GET /api/scam-sessions/:sessionId
 */
const getSessionById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { sessionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid session ID.',
      });
    }

    const session = await ScamSession.findOne({
      _id: sessionId,
      user: userId,
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found.',
      });
    }

    return res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error('Get Session Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch session.',
    });
  }
};

/**
 * GET /api/scam-sessions/history
 */
const getMySessions = async (req, res) => {
  try {
    const userId = req.user.id;

    const sessions = await ScamSession.find({ user: userId })
      .sort({ createdAt: -1 })
      .select(
        '_id scamType state riskScore isCompleted turnCount trapAttempts successfulDefenses createdAt updatedAt'
      );

    return res.status(200).json({
      success: true,
      count: sessions.length,
      sessions,
    });
  } catch (error) {
    console.error('Get My Sessions Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch session history.',
    });
  }
};

/**
 * PATCH /api/scam-sessions/:sessionId/end
 */
const endSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { sessionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid session ID.',
      });
    }

    const session = await ScamSession.findOneAndUpdate(
      { _id: sessionId, user: userId },
      {
        $set: {
          isCompleted: true,
          state: 'defended',
          resultReason: 'Ended manually by user',
        },
      },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Session ended successfully.',
      session,
    });
  } catch (error) {
    console.error('End Session Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to end session.',
    });
  }
};

/**
 * DELETE /api/scam-sessions/:sessionId
 */
const deleteSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { sessionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid session ID.',
      });
    }

    const deleted = await ScamSession.findOneAndDelete({
      _id: sessionId,
      user: userId,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Session not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Session deleted successfully.',
    });
  } catch (error) {
    console.error('Delete Session Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete session.',
    });
  }
};

module.exports = {
  startSession,
  sendMessage,
  getSessionById,
  getMySessions,
  endSession,
  deleteSession,
};
