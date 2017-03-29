const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const models = {};
//
// const sequelize = new Sequelize('db', null, null, {
//   host: 'localhost',
//   dialect: 'sqlite',
//
//   // SQLite only
//   storage: './instance/db.sqlite',
// });

models.Event = sequelize.import('./event.js');
models.Hazard = sequelize.import('./hazard.js');
models.HazardJoin = sequelize.import('./hazardjoin.js');
models.User = sequelize.import('./user.js');
// models.UserJoin = sequelize.import('./userjoin.js');

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
    // console.log('modelsssss: ', models)
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
