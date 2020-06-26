const request = require('supertest');
const app = require('../lib/app.js');
const Reviewer = require('../lib/models/Reviewer.js');
const { prepare } = require('../data-base-helpers/data-base-helpers');

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
    const reviewer = prepare(await Reviewer.findOne());

    return await request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });
  });
});
