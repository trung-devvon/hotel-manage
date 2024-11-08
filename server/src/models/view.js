'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class View extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  View.init({
    anonymous: DataTypes.INTEGER,
    registed: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'View',
  });
  View.beforeCreate(function (model) {
    model.id = v4()
  })
  return View;
};