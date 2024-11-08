const router = require("express").Router();
const controllers = require("../controllers/user.controllers");
const { email, password, name, avatar } = require("../middlewares/joiSchema");
const validate = require("../middlewares/validation");
const { verifyToken } = require("../middlewares/verifyToken");
const joi = require("joi");

router.post(
  "/register",
  validate(joi.object({ email, password, name, avatar })),
  controllers.register
);
router.post(
  "/login",
  validate(joi.object({ email, password })),
  controllers.login
);
router.get("/getCurrent", verifyToken, controllers.getCurrentUser);
router.get("/check", controllers.getRoles);

module.exports = router;
