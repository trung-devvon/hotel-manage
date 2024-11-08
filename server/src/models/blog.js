'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Blog.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    postedBy: DataTypes.UUID,
    views: DataTypes.INTEGER,
    liked: DataTypes.INTEGER,
    disliked: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Blog',
  });
  Blog.beforeCreate(function (model) {
    model.id = v4();
  })
  return Blog;
};