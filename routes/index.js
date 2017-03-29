const express = require('express');
const models = require('../models/index.js');
const formVariables = require('../data/formVariables.js');
const _ = require('lodash');
// console.log('variables in routes: ', formVariables);
const routes = express.Router();


routes.get('/', (req, res) => {
  res.render('pages/index.ejs');
});

routes.get('/event', (req, res) => {
  res.render('pages/hsform.ejs', {
    event: formVariables.formDefaults,
    error: {},
    injuryArray: formVariables.injuryTypes,
    locationArray: formVariables.injuryLocation,
  });
});

routes.get('/event/:id/submit', (req, res) => {
  models.Event.findOne({
    where: { id: req.params.id },
    include: [models.Hazard],
  }).then((event) => {
    res.render('pages/submission-complete.ejs', {
      event,
    });
  });
});


routes.get('/event/:id/edit', (req, res) => {
  models.Event.findOne({
    where: { id: req.params.id },
    include: [models.Hazard, models.User],
  }).then((event) => {
    res.render('pages/edit.ejs', {
      error: {},
      event,
      injuryArray: formVariables.injuryTypes,
      locationArray: formVariables.injuryLocation,
    });
  });
});

routes.get('/event/:id/view', (req, res) => {
  models.Event.findOne({
    where: { id: req.params.id },
    include: [models.Hazard, models.User],
  }).then((event) => {
    // console.log('event: ', event, event.injuryTypes);
    res.render('pages/view.ejs', {
      event,
      injuryArray: formVariables.injuryTypes,
      locationArray: formVariables.injuryLocation,
    });
  });
});


// initial post route - event (event) and assoc model created
routes.post('/event', (req, res) => {
  // console.log('req body: ', req.body);

  // select fields with nothing selected are undefined
  req.body = _.defaults(req.body, formVariables.formDefaults);

  return models.Event.create({
    date: req.body.date,
    nature: req.body.nature,
    // removed fname and lname
    siteLocation: req.body.siteLocation,
    activity: req.body.activity,
    injuryType: req.body.injuryType,
    injuryLocation: req.body.injuryLocation,
    incidentDescription: req.body.incidentDescription,
  })
    .then((event) => {
        // console.log('event: ', event);
        //  res.send(event);
      const hazardPromises = req.body.hazards.map(hazard => models.Hazard.findOrCreate({
        where: {
          safetyHazard: hazard.safetyHazard,
          hazardDescription: hazard.hazardDescription,
          riskLevel: hazard.riskLevel,
          controlMeasures: hazard.controlMeasures,
        },
      }).then(([instance, created]) => instance || created));
        // console.log('hazardPromises: ', hazardPromises);

      const hazardPromise = Promise.all(hazardPromises)
          .then(hazards =>
            // console.log('hazard: ', hazards);
             event.setHazards(hazards));

      const userPromiseX = models.User.findOrCreate({ where: {
        fname: req.body.fname,
        lname: req.body.lname,
      },
      }).then(([instance, created]) => instance || created);

      const userPromise = userPromiseX.then(user => event.setUser(user));

        // return hazardPromise.then(() => userPromise).then(() => {
        //   return res.redirect(`/event/${event.id}/view`);
        // })

      return Promise.all([userPromise, hazardPromise]).then(() => res.redirect(`/event/${event.id}/view`));
    }).catch((err) => {
        // console.log('err', err)
      if (err.name == 'SequelizeValidationError') {
        const error = err.errors.reduce((o, e) => {
          o[e.path] = `${e.type} : ${e.message}`;
          return o;
        }, {});

          // console.log('the RB: ', req.body);

        const options = {
          event: req.body,
          injuryArray: formVariables.injuryTypes,
          locationArray: formVariables.injuryLocation,
          error,
        };

          // console.log('options...: ', options)
          // console.log('options', options)

        return res.render('pages/hsform.ejs', options);
      }
      throw err;

        // var event = _.defaults(req.body, formVariables.formDefaults)
    });
});
// update route - edit details before submitting
routes.post('/event/:id/update', (req, res) => {
  req.body = _.defaults(req.body, formVariables.formDefaults);

  console.log('req body: ', req.body);
  models.Event.findOne({
    where: {
      id: req.params.id,
    },
  }).then(event => event.update({
    date: req.body.date,
    nature: req.body.nature,
    siteLocation: req.body.siteLocation,
    activity: req.body.activity,
    injuryType: req.body.injuryType,
    injuryLocation: req.body.injuryLocation,
    incidentDescription: req.body.incidentDescription,
  })
            .then((event) => {
                // console.log('event updated? ', event)

              const hazardPromises = req.body.hazards.map(hazard =>
                    // console.log('each hazard: ', hazard)
                    // console.log('RB data: ', hazard.hazardDescription)
                     models.Hazard.findOrCreate({
                       where: {
                         safetyHazard: hazard.safetyHazard,
                         hazardDescription: hazard.hazardDescription,
                         riskLevel: hazard.riskLevel,
                         controlMeasures: hazard.controlMeasures,
                       },
                     }).then(([instance, created]) =>
                        // console.log('instance or created: ', [instance, created]);
                         instance || created));

              const hazardPromise = Promise.all(hazardPromises)
                    .then(hazard => event.setHazards(hazard));

              const userPromise = models.User.findOrCreate({
                where: {
                  fname: req.body.fname,
                  lname: req.body.lname,
                },
              })
                    .then(([instance, created]) => instance || created)
                    .then(user => event.setUser(user));

              return Promise.all([hazardPromise, userPromise]).then(() => {
                res.redirect(`/event/${event.id}/view`);
              });
            }))
        .catch((err) => {
          if (err.name == 'SequelizeValidationError') {
            const error = err.errors.reduce((o, e) => {
              o[e.path] = `${e.type} : ${e.message}`;
              return o;
            }, {});
            console.log('sq val err', error);

                // console.log('the RB: ', req.body);

            const options = {
              event: req.body,
              injuryArray: formVariables.injuryTypes,
              locationArray: formVariables.injuryLocation,
              error,
            };

                // console.log('options...: ', options)
                // console.log('options', options)

            return res.render('pages/hsform.ejs', options);
          }
          throw err;
        });
});
module.exports = routes;
