'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Availability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Availability.init({
    name: DataTypes.UUID,
    hotelId: DataTypes.UUID,
    description: DataTypes.STRING,
    guests: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    type: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Availability',
  });
  Availability.beforeCreate(function(model) {
    model.id = v4()
  })
  return Availability;
};