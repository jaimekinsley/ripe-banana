const mongoose = require('mongoose');
const Review = require('./Review');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
}, {
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
});

schema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reviewer'
});

schema.statics.deleteIfNoReviews = async function(id) {
  const Review = this.model('Review');

  const reviews = await Review.find({ reviewer : id });
  
  if(reviews.length !== 0) {
    throw new Error('There are reviews cannot delete reviewer');
  } else {
    return this.findByIdAndDelete(id);
  }
};

module.exports = mongoose.model('Reviewer', schema);
