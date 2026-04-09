const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['user', 'model'],
      required: true,
    },
    parts: [
      {
        text: {
          type: String,
          required: true,
          trim: true,
          maxlength: 2000,
        },
      },
    ],
  },
  { _id: false }
);

const scamSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    scamType: {
      type: String,
      enum: [
        'bank_impersonation',
        'delivery_fraud',
        'tech_support',
        'relational_scam',
        'unknown',
      ],
      default: 'unknown',
    },

    state: {
      type: String,
      enum: ['scamming', 'compromised', 'defended', 'error'],
      default: 'scamming',
      index: true,
    },

    // ONLY visible chat history for Gemini
    messages: {
      type: [messageSchema],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.length <= 50; // 25 user+AI pairs max
        },
        message: 'Message history exceeded maximum limit.',
      },
    },

    trapAttempts: {
      type: Number,
      default: 0,
      min: 0,
    },

    successfulDefenses: {
      type: Number,
      default: 0,
      min: 0,
    },

    appreciatedAt3: {
      type: Boolean,
      default: false,
    },

    resultReason: {
      type: String,
      default: '',
      maxlength: 500,
    },

    riskScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    isCompleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    turnCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastAiMeta: {
      state: {
        type: String,
        enum: ['scamming', 'compromised', 'defended', 'error'],
        default: 'scamming',
      },
      scamType: {
        type: String,
        enum: [
          'bank_impersonation',
          'delivery_fraud',
          'tech_support',
          'relational_scam',
          'unknown',
        ],
        default: 'unknown',
      },
      confidence: {
        type: Number,
        min: 0,
        max: 1,
      },
      userAction: {
        type: String,
        enum: ['neutral', 'resisted', 'fell_for_it', 'asked_question'],
        default: 'neutral',
      },
      trapAttemptDetected: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ScamSession', scamSessionSchema);
