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

  .patch('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new : true })
      .then(updated => res.send(updated))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Reviewer
      .deleteIfNoReviews(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  })
;


