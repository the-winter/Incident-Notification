process.env.NODE_ENV = 'test';

const Sequelize = require('sequelize');
const chai = require('chai');
const models = require('../models/index.js');
const _ = require('lodash');

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

describe('table', () => {
  beforeEach((done) => {
    models.sequelize.sync({ force: true }) // drops table and re-creates it
    .then(() => {
      done(null);
    })
    .error((error) => {
      done(error);
    });
  });

  describe('event table', () => {
    ['date', 'nature', 'siteLocation', 'activity', 'injuryType', 'injuryLocation', 'incidentDescription']
    .forEach((property) => {
      it(`should create a row ${property}`, () => {
        const data = {
          date: new Date('Fri Mar 17 2017 10:54:43 GMT+0800 (W. Australia Standard Time)'),
          nature: 'First Aid',
          siteLocation: 'value',
          activity: 'value',
          injuryType: ['value', 'value2'],
          injuryLocation: ['value'],
          incidentDescription: 'value',
        };
        return models.Event.create(data).then((row) => {
          row.should.have.property(property).to.deep.equal(data[property]);

          // expect(row).to.have.property(property, data[property])
          // expect(row.dataValues).to.deep.equal({
          //   date: new Date('2017-03-17T02:54:43.000Z'),
          //    nature: 'First Aid',
          //    siteLocation: 'value',
          //    activity: 'value',
          //    injuryType: 'value',
          //    injuryLocation: 'value',
          //    incidentDescription: 'value',
          //    id: 1,
          //    createdAt: row.dataValues.createdAt,
          //    updatedAt: row.dataValues.updatedAt
          //   });
        });
      });
    });
  });
});
