const { notFound, internalServerError } = require("../middlewares/handleError")
const insert = require("./insertDB")
const user = require("./user.routes")
const destination = require("./destination.routes")
const hotel = require("./hotel.routes")
const hotelType = require("./hotelType.routes")
const facility = require("./facility.routes")

const BASE_ENDPOINT = '/api/v1/'
const initWebRoutes = (app) => {
  app.use(`${BASE_ENDPOINT}insert`, insert)
  app.use(`${BASE_ENDPOINT}user`, user)
  app.use(`${BASE_ENDPOINT}destination`, destination)
  app.use(`${BASE_ENDPOINT}hotel`, hotel)
  app.use(`${BASE_ENDPOINT}hotelType`, hotelType)
  app.use(`${BASE_ENDPOINT}facility`, facility)

  app.use(notFound)
  app.use(internalServerError)
}

module.exports = initWebRoutes