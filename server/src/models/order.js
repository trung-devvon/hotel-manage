"use strict";
const { Model } = require("sequelize");
const { v4 } = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      orderBy: DataTypes.UUID,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      priceOrder: DataTypes.FLOAT,
      price: DataTypes.FLOAT,
      quantity: DataTypes.INTEGER,
      availableId: DataTypes.UUID,
      status: {
        type: DataTypes.ENUM,
        values: [
          "Chờ xác nhận",
          "Đã nhận phòng",
          "Hủy nhận phòng",
          "Đã xác nhận đặt phòng",
        ],
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  Order.beforeCreate(function(model) {
    model.id = v4();
  })
  return Order;
};
