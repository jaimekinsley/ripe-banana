const request = require('supertest');
const app = require('../lib/app');
const Actor = require('../lib/models/Actor');
const { prepare } = require('../data-base-helpers/data-base-helpers');

describe('Actor tests', () => {
  it('creates an actor with POST', async() => {
    return await request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Keanu Reeves',
        dob: new Date('August 19, 1975 23:15:30'),
        pob: 'Los Angeles'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'Keanu Reeves',
          dob: new Date('August 19, 1975 23:15:30').toISOString(),
          pob: 'Los Angeles'
        });
      });
  });

  it('retrieves all actors with GET', async() => {
    const actors = prepare(await Actor.find().select({ name : true }));
    return await request(app)
      .get('/api/v1/actors')
      .then(res => {expect(res.body).toEqual(actors);});
  });

  it('retrieves an actor with GET by id', async() => {
    const actor = prepare(await Actor.findOne()
      .populate({ path: 'films',
        select: { _id: true, title: true, released: true } })
      .lean()
      .then(actor => {
        actor.films.forEach(film => {
          delete film.cast;
        });
        return actor;
      }));
    return await request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual(actor);});
  });
});
