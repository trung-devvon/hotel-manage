const router = require("express").Router();
const joi = require("joi");
const {
  name,
  code,
  image,
  string,
} = require("../middlewares/joiSchema");
const { isAdmin, verifyToken } = require("../middlewares/verifyToken");
const ctrls = require("../controllers/hotelType.controllers");
const validate = require("../middlewares/validation");

router.post(
  "/create-new",
  verifyToken,
  isAdmin,
  validate(joi.object({ name, code, image })),
  ctrls.createNewHotelType
);
router.get("/all", ctrls.getAllTypes);
router.get("/", ctrls.getHotelTypes);
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  validate(joi.object({ name: string, image: string })),
  ctrls.updateHotelType
);
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  ctrls.deleteHotelType
);

module.exports = router
