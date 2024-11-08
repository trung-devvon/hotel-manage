const db = require("../models");
const asyncHandler = require("express-async-handler");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

const createNewHotelType = asyncHandler(async (req, res) => {
  const response = await db.HotelType.findOrCreate({
    where: { code: req.body.code },
    defaults: req.body,
  });
  return res.json({
    message: response[1] ? "Đã tạo thành công!" : "Có lỗi hãy thử lại sau.",
    success: response[1] ? true : false,
  });
});
const getAllTypes = asyncHandler(async (req, res) => {
  const response = await db.HotelType.findAll({
    attributes: ["code", "name", "image", "id"],
    include: [{ model: db.Hotel, as: "hotelData", attributes: ['name', 'id'] }],
  })
  return res.json({
    success: !!response,
    message: response ? "Got!!" : "Có lỗi xảy ra hãy thử lại sau.",
    hotelTypes: response,
  });
});
const getHotelTypes = asyncHandler(async (req, res) => {
  const { limit, page, fields, sort, keyword, ...query } = req.query;
  const limitQuery = +limit || +process.env.LIMIT;
  const offset = +page - 1 || 0;
  const offsetQuery = offset * limitQuery;
  if (keyword) {
    query[Op.or] = [
      {
        name: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("name")),
          "LIKE",
          "%" + keyword.toLowerCase() + "%"
        ),
      },
    ];
  }
  const queries = {};
  if (sort) queries.order = [sort.split(",")];
  else queries.order = [["createdAt", ["DESC"]]];
  queries.offset = offsetQuery;
  queries.limit = limitQuery;
  if (fields) queries.attributes = fields.split(",");
  const response = await db.HotelType.findAndCountAll({
    where: query,
    ...queries,
  });
  return res.json({
    success: response ? true : false,
    hotelTypes: response,
  });
});
const updateHotelType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await db.HotelType.update(req.body, {
    where: { id },
  });
  return res.json({
    success: response[0] > 0 ? true : false,
    mes: response[0] > 0 ? "Đã Cập Nhật." : "Có lỗi hãy thử lại sau.",
  });
});
const deleteHotelType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await db.HotelType.destroy({
    where: { id },
  });
  return res.json({
    success: response > 0 ? true : false,
    mes: response > 0 ? "Đã Cập Nhật." : "Có lỗi hãy thử lại sau.",
  });
});
module.exports = {
  createNewHotelType,
  getAllTypes,
  getHotelTypes,
  updateHotelType,
  deleteHotelType,
};
