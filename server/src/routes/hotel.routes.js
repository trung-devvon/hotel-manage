const router = require("express").Router();
const joi = require("joi");
const {
  name,
  code,
  image,
  stringRequired,
  arrayRequired,
  string,
  number,
  uuidRequired,
  numberRequired,
} = require("../middlewares/joiSchema");
const { isAdmin, verifyToken } = require("../middlewares/verifyToken");
const ctrls = require("../controllers/hotel.controllers");
const validate = require("../middlewares/validation");

router.post(
  "/create",
  verifyToken,
  isAdmin,
  validate(
    joi.object({
      name: stringRequired,
      destinationCode: stringRequired,
      images: arrayRequired,
      facilities: arrayRequired,
      address: stringRequired,
      description: string,
      typeCode: stringRequired,
      lnglat: arrayRequired,
      star: numberRequired
    })
  ),
  ctrls.createNewHotel
);
router.post(
  "/add-rule/:hotelId",
  verifyToken,
  validate(
    joi.object({
      timeGetRoomStart: number,
      timeGetRoomEnd: number,
      timeLeftRoomStart: number,
      timeLeftRoomEnd: number,
      childrenAndBed: string,
      cashOnly: arrayRequired,
      cancellation: stringRequired,
      pets: string,
      ageRetriction: number,
      hotelId: uuidRequired,
    })
  ),
  ctrls.addRulesById
);
router.post(
  "/available",
  verifyToken,
  validate(
    joi.object({
      hotelId: uuidRequired,
      name: stringRequired,
      description: stringRequired,
      guests: numberRequired,
      price: numberRequired,
      type: uuidRequired
    })
  ),
  ctrls.createAvailable
);
router.get("/", ctrls.getHotels);
router.get("/search", ctrls.searchIndexHotels);
router.get("/typerooms", ctrls.getTypeRooms);

module.exports = router;
