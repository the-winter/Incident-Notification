const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const routes = require('./routes');
const models = require('./models/index.js');
const formVariables = require('./data/formVariables.js');

// console.log('models: ', models);
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use('/', routes);
app.use('/static', express.static('public'));

app.set('view engine', 'ejs');

models.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 8000);
    console.log('listening...',process.env.PORT || 8000);
})

module.exports = app;
