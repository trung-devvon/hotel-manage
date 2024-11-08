'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Facility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Facility.init({
    value: DataTypes.STRING,
    icon: DataTypes.STRING,
    subs: {
      type: DataTypes.TEXT,
      set(value) {
        this.setDataValue('subs', JSON.stringify(value));
      },
      get() {
        const raw = this.getDataValue('subs')
        return raw ? JSON.parse(raw) : []
      }
    }
  }, {
    sequelize,
    modelName: 'Facility',
  });
  Facility.beforeCreate(function (model) {
    model.id = v4()
  })
  return Facility;
};