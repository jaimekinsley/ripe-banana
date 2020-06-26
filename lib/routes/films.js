const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Film
      .find()
      .select({ title: true, released: true, studio: true })
      .then(films => res.send(films))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .select({ title: true, released: true, studio: true, cast: true })
      .populate({
        path:'reviews',
        select: { _id: true, rating: true, review: true, 
          reviewer: true },
        populate : { path: 'reviewer', select: { _id : true, name: true } }
      })
      .then(film => res.send(film))
      .catch(next);
  });
