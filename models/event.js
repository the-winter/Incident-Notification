module.exports = function (sequelize, DataTypes) {
  const Event = sequelize.define('event', {
    date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true,
        isDate: true,
      },
    },
    nature: {
      type: DataTypes.ENUM('Near Miss', 'First Aid', 'Medical Treatment'),
      validate: {
        notEmpty: true,
      },
    },
    siteLocation: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    activity: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    injuryType: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      get: function injuryTypeGetter() {
        return this.getDataValue('injuryType').split(', ');
      },
      set: function injuryTypeSetter(value) {
        return this.setDataValue('injuryType', value.join(', '));
      },
    },
    injuryLocation: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      get: function injuryLocationGetter() {
        return this.getDataValue('injuryLocation').split(', ');
      },
      set: function injuryLocationSetter(value) {
        return this.setDataValue('injuryLocation', value.join(', '));
      },
    },
    incidentDescription: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  },
    {
      classMethods: {
        associate(models) {
        // define relationships here
          Event.belongsToMany(models.Hazard, {
            through: models.HazardJoin,
          });
          Event.belongsTo(models.User);
        },
      },
    });
  return Event;
};
