'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class GeneralRule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GeneralRule.init({
    timeGetRoomStart: DataTypes.FLOAT,
    timeGetRoomEnd: DataTypes.FLOAT,
    timeLeftRoomStart: DataTypes.FLOAT,
    timeLeftRoomEnd: DataTypes.FLOAT,
    childrenAndBed: DataTypes.TEXT,
    ageRetriction: DataTypes.INTEGER,
    pets: {
      type: DataTypes.ENUM,
      values: ['ENABLE', 'DISABLE']
    },
    cashOnly: {
      type: DataTypes.TEXT,
      set(value) {
        this.setDataValue('cashOnly', JSON.stringify(value))
      },
      get() {
        const raw = this.getDataValue('cashOnly')
        return raw ? JSON.parse(raw) : []
      }
    },
    hotelId: DataTypes.UUID,
    cancellation: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'GeneralRule',
  });
  GeneralRule.beforeCreate(function (model) {
    model.id = v4()
  })
  return GeneralRule;
};