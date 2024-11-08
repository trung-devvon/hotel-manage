const db = require("../models");
const asyncHandler = require("express-async-handler");

const getFacilities = asyncHandler(async (req, res) => {
  const response = await db.Facility.findAll();
  return res.json({
    success: response ? true : false,
    message: response ? "Got" : "Có lỗi thử lại sau.",
    facilities: response
  });
});
module.exports = { getFacilities }
