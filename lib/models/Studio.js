const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Studio', schema);
