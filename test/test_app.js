process.env.NODE_ENV = 'test';

const Sequelize = require('sequelize');
const models = require('../models/index.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiHttp);


// Our parent block
describe('table', () => {
  beforeEach(function (done) {
    this.timeout(5000);
    models.sequelize.sync({ force: true }) // drops table and re-creates it
      .then(() => models.Event.create({
        date: new Date('Fri Mar 17 2017 10:54:43 GMT+0800 (W. Australia Standard Time)'),
        nature: 'First Aid',
        siteLocation: 'dancing',
        activity: 'dancing',
        injuryType: ['value', 'value2'],
        injuryLocation: ['value'],
        incidentDescription: 'something',
        user: {
          fname: 'holly',
          lname: 'weary',
        },
        hazards: [{ safetyHazard: 'Safety', hazardDescription: 'dancing', riskLevel: 'dance', controlMeasures: 'gsdhghdg' }],
      },
        { include: [models.User, models.Hazard] },
      )).then(() => {
        // debugger;
        // console.log(' test event: ', event);
        done();
      })
      .error((error) => {
        done(error);
      });
  });

  describe('Get /', () => {
    it('should GET the main page', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        return done(err);
      });
    });
  });

  describe('Post /event', () => {
    it('should POST a new event', (done) => {
      const newEvent = {
        date: new Date('Fri Mar 17 2017 10:54:43 GMT+0800 (W. Australia Standard Time)'),
        nature: 'First Aid',
        siteLocation: 'dancing',
        activity: 'dancing',
        injuryType: ['value', 'value2'],
        injuryLocation: ['value'],
        incidentDescription: 'something',
      };
      chai.request(server)
      .post('/event')
      .send(newEvent)
      .end((err, res) => {
        // console.log('res: ', res);
        res.should.have.status(200);
        return done(err);
      });
    });
  });

  describe('Get /event/:id/view', () => {
    it('should GET an event', (done) => {
      // let eventInstance = models.Event.findOne({ where: { siteLocation: 'testtest'} } )
      // .then((eventInstance) => {
      //   console.log('event instance: ', eventInstance)
      //   return eventInstance
      // })
      chai.request(server)
      .get('/event/1/view')
      .end((err, res) => {
        // console.log('res: ', res);
        res.should.have.status(200);
        return done(err);
      });
    });
  });

  // describe('Update /event/:id/update', ()=> {
  //   it('should update event', function (done){
  //     this.timeout(5000)
  //     let editedData = {
  //       date: 'Fri Mar 17 2017 10:54:43 GMT+0800 (W. Australia Standard Time)',
  //       nature: 'First Aid',
  //       siteLocation: 'chair',
  //       activity: 'sitting',
  //       injuryType: ['value', 'value2'],
  //       injuryLocation: ['value'],
  //       incidentDescription: 'something',
  //       user: {
  //         fname: 'holly',
  //         lname: 'hols'
  //       },
  //       hazards: [{safetyHazard: 'Safety', hazardDescription: 'chairs', riskLevel: 'high', controlMeasures: 'gsdhghdg'}]
  //     }
  //     return chai.request(server)
  //     .post('/event/1/update')
  //     .send(editedData)
  //     .end((res)=> {
  //       console.log('this response is: ', res)
  //       return done(err);
  //     })
  //   // })
  //   .catch(err => {
  //     return done(err)
  //   })
  //   })
  //   })
});
