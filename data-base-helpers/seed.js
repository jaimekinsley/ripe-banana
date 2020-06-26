const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');

module.exports = async({ studios = 20, actors = 50, reviewers = 25, films = 100 } = {}) => {

  const createdStudios = await Studio.create([...Array(studios)].map(() => ({
    name: chance.company(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

  const createdActors = await Actor.create([...Array(actors)].map(() => ({
    name: chance.name(),
    dob: chance.date(),
    pob: chance.city()
  })));

  await Reviewer.create([...Array(reviewers)].map(() => ({
    name: chance.name(),
    company: chance.company()
  })));

  await Film.create([...Array(films)].map(() => ({
    title: `${chance.animal()} ${chance.profession()}`,
    studio: chance.pickone(createdStudios),
    released: chance.natural({ min: 1800, max: 2020 }),
    cast: [{ role: chance.name(), actor: chance.pickone(createdActors) }]
    // how to add multiple cast members in seeded data?
  })));
};
