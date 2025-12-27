const mongoose = require('mongoose');

// Blacklisted JWT tokens — documents expire automatically after 24 hours
const blacklistTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true, index: true },
  createdAt: { type: Date, default: Date.now } // TTL index defined below
});

// Ensure a TTL index of 24 hours (86400 seconds) on createdAt
blacklistTokenSchema.index({ createdAt: 1 }, 
    { expireAfterSeconds: 86400 });

/**
 * Convenience static helper to blacklist a token
 * Usage: await BlacklistToken.blacklist(tokenString);
 */
blacklistTokenSchema.statics.blacklist = function (token) {
  return this.create({ token });
};

const BlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);
module.exports = BlacklistToken;

