const request = require('supertest');
const app = require('../lib/app');
const Film = require('../lib/models/Film');
const { prepare } = require('../data-base-helpers/data-base-helpers');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');

describe('film routes', () => {
  it('creates a film with POST', async() => {
    const studio = prepare(await Studio.findOne());
    const actor = prepare(await Actor.findOne());

    return await request(app)
      .post('/api/v1/films')
      .send({
        title: 'Shirley',
        studio: studio._id,
        released: 2020,
        cast: {
          role: 'Shirley Jackson',
          actor: actor._id
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          title: 'Shirley',
          studio: studio._id,
          released: 2020,
          cast: [{ _id: expect.anything(), role: 'Shirley Jackson', actor: actor._id }]
        });
      });
  });

  it('gets all films with GET', async() => {
    const films = prepare(await Film.find().select({ title: true, released: true, studio: true }));

    return await request(app)
      .get('/api/v1/films')
      .then(res => {expect (res.body).toEqual(films);
      });
  });

  it('gets a film by id with GET', async() => {
    const film = prepare(await Film.findOne()
      .select({ title: true, released: true, studio: true, cast: true })
      .populate({
        path:'reviews',
        select: { _id: true, rating: true, review: true, 
          reviewer: true },
        populate : { path: 'reviewer', select: { _id : true, name: true } }
      }));

    return await request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect (res.body).toEqual(film);});
  });
});
