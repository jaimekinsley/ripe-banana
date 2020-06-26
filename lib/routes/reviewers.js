const { Router } = require('express');
const Reviewer = require('../models/Reviewer.js');

module.exports = Router()

  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .populate({
        path:'reviews',
        select: { _id: true, rating: true, review: true, film: true },
        populate : { path: 'film', select: { _id : true, title: true } }
      })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
;


