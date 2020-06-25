require('dotenv').config();
require('./lib/utils/connect')();

const mongoose = require('mongoose');
const seed = require('./data-base-helpers/seed');

seed()
  .then(() => console.log('Database Seeded!'))
  .catch(err => console.error(`Error: ${err}`))
  .finally(() => mongoose.connection.close());
