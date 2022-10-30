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
const { groupBy } = require('lodash');
const router = express.Router();


router.get('/current', requireAuth, async (req, res, next) => {
    const allBookings = await Booking.findAll({
        attributes: {
            include: ['id']
        },
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


router.put('/:bookingId', requireAuth, async (req, res, next) => {

    const { startDate, endDate } = req.body
    const bookingId = req.params.bookingId



    const booking = await Booking.findOne({
        attributes: {
            include: ["id"]
        },
        where: {
            id: bookingId
        }
    })

    if (!booking) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }else if (booking.toJSON().userId !== req.user.id) {
        res.status(403)
        return res.json({
            message: "Access Denied: Permission Required",
            statusCode: 403
        })
    }
    const spotId = booking.toJSON().spotId
    const startDateToObject = new Date(startDate);
    const endDateToObject = new Date(endDate);
    const bookingsEndDateToObject = new Date(booking.toJSON().endDate);
    const bookingsStartDateToObject = new Date(booking.toJSON().startDate);

    if (bookingsEndDateToObject < Date.now()) {
        res.status(403)
        return res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    }
    if (!startDateToObject || !endDateToObject) {
      res.status(400);
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          input: "startDate or endDate should be a valid date",
        },
      });
    }

    if (startDateToObject <= Date.now()) {
      res.status(400);
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          endDate: "startDate cannot be in the past",
        },
      });
    }
    if (endDate <= startDate) {
      res.status(400);
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          endDate: "endDate cannot come before startDate",
        },
      });
    }



    const isBooked = await Booking.findAll({
        where: {
          spotId: spotId,
        },
      });

    if (isBooked.length) {
        for (let i = 0; i < isBooked.length; i++) {
          const bookedStartDate = isBooked[i].toJSON().startDate;
          const bookedEndDate = isBooked[i].toJSON().endDate;

          if (bookedStartDate === startDate && bookedEndDate === endDate) {
            res.status(403);
            return res.json({
              message:
                "Sorry, this spot is already booked for the specified dates",
              statusCode: 403,
              errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking",
              },
            });
          } else if (bookedStartDate < endDate && bookedEndDate >= endDate) {
            res.status(403);
            return res.json({
              message:
                "Sorry, this spot is already booked for the specified dates",
              statusCode: 403,
              errors: {
                endDate: "End date conflicts with an existing booking",
              },
            });
          } else if (bookedStartDate <= startDate && bookedEndDate > startDate) {
            res.status(403);
            return res.json({
              message:
                "Sorry, this spot is already booked for the specified dates",
              statusCode: 403,
              errors: {
                startDate: "Start date conflicts with an existing booking",
              },
            });
          }
        }
      }

        booking.update({
          spotId: spotId,
          userId: req.user.id,
          startDate,
          endDate,
        });

        res.json({
          booking,
        });




})

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const bookingId = req.params.bookingId



    const booking = await Booking.findOne({
        attributes: {
            include: ["id"]
        },
        where: {
            id: bookingId
        }
    })

    if (!booking) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }else if (booking.toJSON().userId !== req.user.id) {
        res.status(403)
        return res.json({
            message: "Access Denied: Permission Required",
            statusCode: 403
        })
    }
    
    const bookingsEndDateToObject = new Date(booking.toJSON().endDate);
    const bookingsStartDateToObject = new Date(booking.toJSON().startDate);

    if (bookingsEndDateToObject < Date.now()) {
        res.status(403)
        return res.json({
            message: "Past bookings can't be deleted",
            statusCode: 403
        })
    }else if ((bookingsStartDateToObject < Date.now()) && (bookingsEndDateToObject > Date.now())) {
        res.status(403)
        return res.json({
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        })
    }else {
        booking.destroy()
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }


})

module.exports = router
