const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  reviewer: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  review: {
    type: String,
    maxlength: 140
  },
  film: {
    type: mongoose.Types.ObjectId,
    required: true
  }
},
{
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.__v;
    }
  },
  toObject: {
    virtuals: true
  }
}
);

schema.statics.top100 = function(){
  return this.aggregate([
    {
      '$sort': {
        'rating': -1
      }
    }, {
      '$limit': 100
    }, {
      '$lookup': {
        'from': 'films',
        'localField': 'film',
        'foreignField': '_id',
        'as': 'film'
      }
    }, {
      '$unwind': {
        'path': '$film'
      }
    }, {
      '$project': {
        '_id': true,
        'rating': true,
        'review': true,
        'film': {
          '_id': true,
          'title': true
        }
      }
    }
  ]);
};

module.exports = mongoose.model('Review', schema);
