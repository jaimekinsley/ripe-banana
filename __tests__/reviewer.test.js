const request = require('supertest');
const app = require('../lib/app.js');
const Reviewer = require('../lib/models/Reviewer.js');
const { prepare } = require('../data-base-helpers/data-base-helpers');
const Review = require('../lib/models/Review.js');

describe('tests reviewer routes', () => {
  it('can create a reviewer with POST', async() => {
    return await request(app)
      .post('/api/v1/reviewers')
      .send({ name: 'Alison Bechdel', company: 'imdb' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'Alison Bechdel',
          company: 'imdb'
        });
      });
  });

  it('can get all reviewers with GET', async() => {
    const reviewers = prepare(await Reviewer.find());  
    
    return await request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual(reviewers);
      });
  });

  it('can get reviewer by GET id', async() => {
    const reviewer = prepare(await Reviewer.findOne()
      .populate({
        path:'reviews',
        select: { _id: true, rating: true, review: true, film: true },
        populate : { path: 'film', select: { _id : true, title: true } }
      }));

    return await request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });
  });

  it('can PATCH a reviewer by id', async() => {
    const reviewer = prepare(await Reviewer.findOne());

    return await request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({
        name: 'updated'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          company: expect.anything(),
          name: 'updated'
        });
      });
    
  });

  it('can delete a reviewer by id if there are no reviews', async() => {
    const reviewer = prepare(await Reviewer.create({ name: 'new persons', company: 'imdb' }));
    
    return await request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });

  });

  it('cannot delete a reviewer with reviews', async() => {
    const reviewer = prepare(await Reviewer.findOne());
    return await request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({ 'message': 'There are reviews cannot delete reviewer',
          'status': 500 });
      });

  });

});
