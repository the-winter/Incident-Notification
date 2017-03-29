module.exports = function (sequelize, DataTypes) {
  const Hazard = sequelize.define('hazard', {
    safetyHazard: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    hazardDescription: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    riskLevel: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    controlMeasures: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    classMethods: {
      associate(models) {
          // define relationships here
        Hazard.belongsToMany(models.Event, {
          through: models.HazardJoin,
        });
      },
    },
  });
  return Hazard;
};
