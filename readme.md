## Incident Notification

This form is designed to make workplace incident reporting convenient.

This project provides a form to be submitted by employees who have been in a workplace related accident or those who wish to report any health and safety risks they observe in the workplace.

The form is divided into two sections. The first section is for the specifics related to the accident (or risk). For instance, the accident description, date, and location.

Section two follows the three 'Thinksafe' steps: spotting the hazard(s), assessing the risk level, and outlining control measures to manage the risk(s).


Here's a link to example deployment: [https://safe-plateau-22260.herokuapp.com/](https://safe-plateau-22260.herokuapp.com/).

## Features
- Fullstack web app
- ES6+ features including [Promises](https://github.com/the-winter/Incident-Notification/blob/master/routes/index.js#L110)
- [Testing](https://github.com/the-winter/Incident-Notification/blob/master/test/test_app.js#L17) with mocha and chai
- Model [associations](https://github.com/the-winter/Incident-Notification/blob/master/models/event.js#L63)
- Front-end and back-end [validation](https://github.com/the-winter/Incident-Notification/blob/master/routes/index.js#L190)
- [Regexp](https://github.com/the-winter/Incident-Notification/blob/master/views/partials/page-scripts.ejs#L18) for front-end custom data validation

## Screenshots

![](/public/images/screenshot0.png)
![](/public/images/screenshot1.png)
![](/public/images/screenshot2.png)
![](/public/images/screenshot3.png)


### Technologies

<table>
<tbody>
  <tr>
    <td>
    Language
    </td>
    <td>
    JavaScript
    </td>
  </tr>
  <tr>
    <td>
    Frameworks
    </td>
    <td>
    ExpressJS on NodeJS<br>
    </td>
  </tr>
  <tr>
    <td>
      Front-End
    </td>
    <td>
     HTML5<br>
    CSS3<br>
    jQuery<br>
    ParsleyJS<br>
    Select2<br>
    jQuery UI Timepicker
    </td>
  </tr>
  <tr>
    <td>Hosting<td>Heroku<br></td>
  </tr>
  <tr>
    <td>
    Javascript Linter
    </td>
    <td>
      ESLint with Airbnb config
    </td>
  </tr>
  <tr>
    <td>
    Templating Language
    </td>
    <td>
    EJS
    </td>
  </tr>
  <tr>
    <td>
    Test Frameworks
    </td>
    <td>
    Mocha<br>
    Chai<br>
    Chai HTTP
    </td>
  </tr>
  <tr>
    <td>
      Database and ORM
    </td>
    <td>
      Sequelize<br>
      Sqlite3
    </td>
  </tr>
  <tr>
    <td>
    Utilities
    </td>
    <td>
    Lodash
    </td>
  </tr>
</tbody>
</table>

## Considerations:

Curently this project is a boilerplate. Form content and functionality may be customized to suit individual business needs. This could include the addition of a login feature.

## Acknowledgements:

Thanks to https://github.com/wassname for your advice and guidance during this project.
