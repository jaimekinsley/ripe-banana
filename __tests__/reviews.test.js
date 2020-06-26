const request = require('supertest');
const app = require('../lib/app');
const Review = require('../lib/models/Review');
const { prepare } = require('../data-base-helpers/data-base-helpers');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');

describe('review routes', () => {
  it('creates a review with POST', async() => {
    const reviewer = prepare(await Reviewer.findOne());
    const film = prepare(await Film.findOne());

    return await request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 5,
        reviewer: reviewer._id,
        review: 'Best movie I\'ve ever seen',
        film: film._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          rating: 5,
          reviewer: reviewer._id,
          review: 'Best movie I\'ve ever seen',
          film: film._id
        });
      });
  });
});
