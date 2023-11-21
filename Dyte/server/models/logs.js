const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    // enum: ['error', 'warning', 'info', 'debug'],
    index: true, // Indexing the level field
  },
  message: {
    type: String,
  },
  resourceId: {
    type: String,
    index: true, // Indexing the resourceId field
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true, // Indexing the timestamp field
  },
  traceId: {
    type: String,
    index: true, // Indexing the traceId field
  },
  spanId: {
    type: String,
    index: true, // Indexing the spanId field
  },
  commit: {
    type: String,
    index: true, // Indexing the commit field
  },
  metadata: {
    type: {
      parentResourceId: {
        type: String,
        index: true, // Indexing the parentResourceId field
      },
    },
  },
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
