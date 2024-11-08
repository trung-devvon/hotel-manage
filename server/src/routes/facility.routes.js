const router = require("express").Router();
const ctrls = require("../controllers/facility.controllers");

router.get(
    "/get-all",
    ctrls.getFacilities
  );

module.exports = router