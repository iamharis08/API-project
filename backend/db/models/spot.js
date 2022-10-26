'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { foreignKey: 'ownerId' });
      Spot.belongsToMany(models.User, {
        through: 'Booking', // This is the model name referencing the join
        otherKey: 'userId',
        foreignKey: 'spotId'
       })

      // Reviews Join Table (many to many relationship) Users with Spots table
      Spot.hasMany(models.Review, { foreignKey: 'spotId' });


      // Spots Table (one to many relationship) spotId association
       Spot.hasMany(models.SpotImage, { foreignKey: 'spotId' });

    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
