const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');

module.exports = async({ studios = 20, actors = 50, reviewers = 25 } = {}) => {

  await Studio.create([...Array(studios)].map(() => ({
    name: chance.company(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

  await Actor.create([...Array(actors)].map(() => ({
    name: chance.name(),
    dob: chance.date(),
    pob: chance.city()
  })));

  await Reviewer.create([...Array(reviewers)].map(() => ({
    name: chance.name(),
    company: chance.company()
  })));
};
