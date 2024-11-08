const jwt = require("jsonwebtoken")
const verifyToken = async (req, res, next) => {
  if (req.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization?.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
      if (err)
        return res.status(401).json({
          success: false,
          message: "Phiên đăng nhập này đã hết hạn hoặc tài khoản không hợp lệ.",
        })
      req.user = decode
      next()
    })
  } else
    return res.status(401).json({
      success: false,
      message: "Yêu cầu đăng nhập.",
    })
}
const isAdmin = (req, res, next) => {
  const { role } = req.user
  if (role != '1945') throw new Error('Yêu cầu role admin!')
  next()
}
const isCreator = (req, res, next) => {
  const { role } = req.user
  if (role !== "1945" && role !== "1954")
    throw new Error("Yêu cầu role creator.")
  next()
}
module.exports = {
    verifyToken,
    isAdmin,
    isCreator
}