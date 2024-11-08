const db = require("../models");
const asyncHandler = require("express-async-handler")
const sequelize = require("sequelize")
const { Op } = require("sequelize")

const createNewDestination = asyncHandler(async (req, res) => {
    const destination = await db.Destination.findOrCreate({
        where: { code: req.body.code },
        defaults: req.body
    })
    console.log(destination)
    return res.json({
        success: destination[1] ? true : false,
        message: destination[1] ? 'Tạo địa điểm thành công' : 'Tên địa điểm đã tồn tại'
    })
})
const getAllDestinations = asyncHandler(async (req, res) => {
    const destinations = await db.Destination.findAll({ attributes: ['code', 'name', 'image']})
    return res.json({
        success: destinations[1] ? true : false,
        message: destinations[1] ? 'Good Job!' : 'Có lỗi xảy ra',
        destinations
    })
})
const getDestinations = asyncHandler(async (req, res) => {
    const { limit, pages, fields, sort, keyword, ...query } = req.query;
    const limitQuery = +limit || +process.env.LIMIT;
    const offset = +pages - 1 || 0;
    const offsetQuery = offset * limitQuery;
    if (keyword)
      query[Op.or] = [
        {
          name: sequelize.where(
            sequelize.fn("LOWER", sequelize.col("name")),
            {
              [Op.like]: "%" + keyword.toLowerCase() + "%",
            }
          ),
        },
        {
          code: sequelize.where(
            sequelize.fn("LOWER", sequelize.col("code")),
            {
              [Op.like]: "%" + keyword.toLowerCase() + "%",
            }
          ),
        },
      ];
    const queries = {};
    //
    queries.offset = offsetQuery;
    queries.limit = limitQuery;
    if (fields) queries.attributes = fields.split(",");
      const response = await db.Hotel.findAndCountAll({
        where: query,
        ...queries,
        raw: true,
      });
      return res.json({
        success: response ? true : false,
        destination: response,
      });
  });

module.exports = { createNewDestination, getAllDestinations, getDestinations }