"use strict";
const { Model } = require("sequelize");
const { v4 } = require("uuid");
const { removeVietnameseAccents } = require('../utils/fn')

module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate(models) {
      // define association here
      Hotel.belongsTo(models.Destination, {
        foreignKey: "destinationCode", // column in hotels
        targetKey: "code", // column in destinations
        as: "destinationData", // as name
      });
      /** 
       *  
       * - foreignKey: 'destinationCode': Đây là tên của cột trong bảng Hotel sẽ chứa khóa ngoại, kết nối đến bảng Destination.
      - targetKey: 'code': Đây là tên của cột trong bảng Destination mà khóa ngoại của Hotel sẽ trỏ đến. Nghĩa là, khóa ngoại của Hotel sẽ giữ giá trị tương ứng với cột code của bảng Destination.
      - as: 'destinationData': Đây là biệt danh (alias) cho quan hệ. Khi truy vấn dữ liệu và sử dụng quan hệ này, có thể sử dụng biệt danh này để xác định quan hệ giữa Hotel và Destination.
      * 
      */ 
     //
      Hotel.belongsTo(models.HotelType, {
        foreignKey: 'typeCode',
        as: 'typeHotel'
      })
      // Hotel.belongsTo(models.HotelType, {
      //   foreignKey: 'typeCode',
      //   targetKey: 'code',
      //   as: 'hotelData'
      // })
      Hotel.hasOne(models.GeneralRule, {
        foreignKey: 'hotelId',
        as: 'rules'
      })
    }
  }
  Hotel.init(
    {
      name: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      star: DataTypes.INTEGER,
      destinationCode: DataTypes.STRING,
      postedBy: DataTypes.UUID,
      description: DataTypes.TEXT,
      typeCode: DataTypes.STRING,
      images: {
        type: DataTypes.TEXT,
        set(value) {
          this.setDataValue("images", JSON.stringify(value));
        },
        get() {
          const raw = this.getDataValue("images");
          return raw ? JSON.parse(raw) : [];
        },
      },
      facilities: {
        type: DataTypes.TEXT,
        set(value) {
          this.setDataValue("facilities", JSON.stringify(value));
        },
        get() {
          const raw = this.getDataValue("facilities");
          return raw ? JSON.parse(raw) : [];
        },
      },
      lnglat: {
        type: DataTypes.TEXT,
        set(value) {
          this.setDataValue("lnglat", JSON.stringify(value))
        },
        get() {
          const raw = this.getDataValue("lnglat");
          return raw ? JSON.parse(raw) : [];
        }
      },
      address: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["ROOMS", "OUT_OF_ROOM"],
      },
      name_normalized: DataTypes.STRING,
      address_normalized: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Hotel",
      indexes: [
        {
          fields: ['name_normalized']
        },
        {
          fields: ['address_normalized']
        }
      ]
    }
  );
  Hotel.beforeCreate(function (model) {
    model.id = v4()
    model.address_normalized = removeVietnameseAccents(model.address.toLowerCase())
    model.name_normalized = removeVietnameseAccents(model.name.toLowerCase())
  });
  return Hotel;
};
