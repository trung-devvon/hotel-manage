const router = require("express").Router()
const { insertData } = require('../controllers/insertDB')

router.post('/', insertData)

module.exports = router