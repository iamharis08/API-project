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
            attributes: {
                exclude: ["description", "createdAt", "updatedAt"]
            },
            include:   {
              model: SpotImage,
              attributes: ["preview", "url"]
            }
        },
        order: ['spotId']
    })

if (!allBookings.length) {
    res.status(404)
    return res.json({
        message: "No Bookings found",
        statusCode: 404
    })
}

const bookings = [];

    allBookings.forEach((booking) => {
        bookings.push(booking.toJSON())
    })



        for (let i = 0; i < bookings.length; i++){

          let spotImagesArray = bookings[i].Spot.SpotImages

          if (spotImagesArray.length) {

            for (let j = 0; j < spotImagesArray.length; j++){

              if (spotImagesArray[j].preview === true) {

                const url = spotImagesArray[j].url
                bookings[i].Spot.previewImage = url

                 delete bookings[i].Spot.SpotImages


              }
            }

          }

        }

    return res.json({
        Bookings: bookings
    })
})


router.put('/:bookingId', requireAuth, async (req, res, next) => {

    const { startDate, endDate } = req.body
    const bookingId = req.params.bookingId

  console.log(startDate, endDate, bookingId)

    const booking = await Booking.findOne({
        // attributes: {
        //     include: ["id"]
        // },
        where: {
            id: bookingId
        }
    })
      console.log(booking.toJSON())
    if (!booking) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found",
            errors: {
              input: "Not Found",
            },
            statusCode: 404
        })
    }else if (booking.toJSON().userId !== req.user.id) {
        res.status(403)
        return res.json({
          message: "Forbidden",
          errors: {
            input: "Not Authorized",
          },
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
            message: "Forbidden Access",
            errors: {
              input: "Past bookings can't be modified",
            },
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
          const bookedStartDate = new Date(isBooked[i].toJSON().startDate);
          const bookedEndDate = new Date(isBooked[i].toJSON().endDate);
          console.log("\n",bookedStartDate,bookedEndDate, "BOOKED DATES")
          console.log("\n",startDateToObject,endDateToObject, "DATES")
          console.log("\n",bookedStartDate < endDateToObject && bookedEndDate >= endDateToObject, "ENDDDDATES")
          if (bookedStartDate === startDateToObject && bookedEndDate === endDateToObject) {
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
          } else if (bookedStartDate < endDateToObject && bookedEndDate >= endDateToObject) {
            res.status(403);
            return res.json({
              message:
                "Sorry, this spot is already booked for the specified dates",
              statusCode: 403,
              errors: {
                endDate: "End date conflicts with an existing booking",
              },
            });
          } else if (bookedStartDate <= startDateToObject && bookedEndDate > startDate) {
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
        console.log(booking.toJSON())

        res.status(200)
        return res.json(
          {...booking.toJSON()}
        );




})

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const bookingId = req.params.bookingId



    const booking = await Booking.findOne({
        // attributes: {
        //     include: ["id"]
        // },
        where: {
            id: bookingId
        }
    })
     console.log(booking.toJSON(), req.user.id)
    if (!booking) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }else if (booking.toJSON().userId !== req.user.id) {
      console.log("why")
        res.status(403)
        return res.json({
            message: "Forbidden",
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
