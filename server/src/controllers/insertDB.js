const db = require('../models')
const asyncHandler = require('express-async-handler')
const { roles, typeRoom, facilities } = require('../utils/constants')

exports.insertData = asyncHandler(async (req, res, next) => {
    try {
        const response = await Promise.all([
            db.Role.bulkCreate(roles, { individualHooks: true }),
            db.TypeRoom.bulkCreate(typeRoom, { individualHooks: true }),
            db.Facility.bulkCreate(facilities, { individualHooks: true })
        ])
        return res.json({
            success: response ? true : false,
            message: response ? 'Done.!': 'fail. !'
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
})