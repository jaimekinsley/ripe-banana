const request = require('supertest');
const app = require('../lib/app');
const Studio = require('../lib/models/Studio');
const { prepare } = require('../data-base-helpers/data-base-helpers');

describe('studio routes', () => {
  it('creates a studio with POST', async() => {
    return await request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Paramount',
        address: {
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'Paramount',
          address: {
            city: 'Los Angeles',
            state: 'CA',
            country: 'United States'
          },
          __v: 0
        });
      });
  });

  it('gets at studio by id with GET', async() => {
    const studio = prepare(await Studio.findOne());

    return await request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual(studio);
      });
  });

  it('gets all studios with GET', async() => {
    const studios = prepare(await Studio.find().select({ name: true }));

    return await request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual(studios);
      });
  });
});
