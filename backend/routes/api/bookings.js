const express = require('express');
// backend/routes/api/users.js
// ...


const { check } = require('express-validator');
const { handleInputValidationErrors } = require('../../utils/validation');
const { reviewAggregate } = require('../../utils/reviewsAggregate');
// ...
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, sequelize, ReviewImage, SpotImage, Booking } = require('../../db/models');
const booking = require('../../db/models/booking');
const { ValidationError } = require('sequelize');
const router = express.Router();


router.get('/current', requireAuth, async (req, res, next) => {
    const allBookings = await Booking.findAll({
        where: {userId: req.user.id},
        include: {
            model: Spot,
        },
        order: ['spotId']
    })
if (!allBookings[0]) {
    res.status(404)
    res.json({
        message: "No Bookings found"
    })
}

console.log(allBookings)
    res.json({
        Bookings: allBookings
    })
})


module.exports = router
