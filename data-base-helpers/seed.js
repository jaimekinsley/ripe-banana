const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');

module.exports = async({ studios = 20 } = {}) => {

  await Studio.create([...Array(studios)].map(() => ({
    name: chance.company(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));
};
