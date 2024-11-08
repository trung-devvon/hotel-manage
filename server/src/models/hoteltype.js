"use strict";
const { Model } = require("sequelize");
const { v4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class HotelType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HotelType.hasMany(models.Hotel, {
        foreignKey: "typeCode",
        sourceKey: 'code',
        as: "hotelData",
      });
    }
  }
  HotelType.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HotelType",
    }
  );
  HotelType.beforeCreate(function (model) {
    model.id = v4();
  });
  return HotelType;
};
