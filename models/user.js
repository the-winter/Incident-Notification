module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('user', {
    fname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    lname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Event);
      },
    },
  });
  return User;
};
