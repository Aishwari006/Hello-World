function validateMessageInput(message) {
  if (typeof message !== 'string') {
    return { valid: false, error: 'Message must be a string.' };
  }

  const trimmed = message.trim();

  if (!trimmed) {
    return { valid: false, error: 'Message cannot be empty.' };
  }

  if (trimmed.length > 500) {
    return { valid: false, error: 'Message must be between 1 and 500 characters.' };
  }

  return { valid: true, value: trimmed };
}

module.exports = {
  validateMessageInput,
};

