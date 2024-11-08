"use strict";
const { Model, ENUM } = require("sequelize");
const bcrypt = require("bcryptjs");
const handleHashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const { v4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { targetKey: "code", foreignKey: "role" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("password", handleHashPassword(value));
        },
      },
      phone: DataTypes.STRING,
      avatar: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM,
        values: ["1945", "1979", "1954"],
      },
      resetPasswordToken: DataTypes.STRING,
      resetPasswordExpiry: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate(function (model) {
    model.id = v4();
  });
  return User;
};
