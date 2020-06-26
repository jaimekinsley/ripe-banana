const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    dob: {
        type:Date,
    },
    pob:{
        type:String
    }
}, {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.id;
        delete ret.__v;
      }
    }
  });

module.exports = mongoose.model('Actor', schema);
