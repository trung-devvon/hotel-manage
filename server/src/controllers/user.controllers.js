const db = require("../models");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../middlewares/jwt");
// const twilio = require("twilio");
// const otpGenerator = require("otp-generator");

const register = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const response = await db.User.findOrCreate({
    where: { email },
    defaults: req.body,
  });

  //   const client = new twilio(
  //     process.env.TWILIO_SID,
  //     process.env.TWILIO_AUTH_TOTEN
  //   );

  //   const message = await client.messages.create({
  //     body: `Your OTP is: ${otp}`,
  //     from: "+15138153064",
  //     to: `${phone}`,
  //   });
  //   console.log(message);
  return res.json({
    success: response[1] ? true : false,
    message: response[1]
      ? "Đăng ký thành công. Hãy đăng nhập"
      : "Email đã tồn tại.",
  });
});
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const response = await db.User.findOne({
    where: { email },
  });
  if (!response) throw new Error("Email chưa được đăng ký!");
  const isInCorrectPassword = bcrypt.compareSync(password, response.password);
  const token = isInCorrectPassword
    ? generateAccessToken(response.id, response.role)
    : null;
  return res.json({
    success: token ? true : false,
    message: token ? "Đăng nhập thành công!" : "Sai mật khẩu!",
    accessToken: token,
  });
});
const getCurrentUser = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const user = await db.User.findByPk(uid, {
    attributes: ["id", "name", "email", "avatar", "phone"],
    include: [{ model: db.Role, attributes: ["value", "code"] }],
  });

  return res.json({
    success: user ? true : false,
    message: user ? "Good Job!" : "Có lỗi hãy thử lại sau!",
    user,
  });
});
const getRoles = asyncHandler(async (req, res) => {
  let roles = await db.Role.findAll({ raw: true })
  if (roles && roles.length > 0) roles = btoa(JSON.stringify(roles))
  return res.json({
    success: roles ? true : false,
    message: roles ? "Good Job!" : "Có Lỗi hãy thử lại sau!",
    roles
  })
})
module.exports = { register, login, getCurrentUser, getRoles };
