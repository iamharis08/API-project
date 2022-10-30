const express = require('express');
// backend/routes/api/users.js
// ...


const { check } = require('express-validator');
const { handleInputValidationErrors } = require('../../utils/validation');
const { reviewAggregate } = require('../../utils/reviewsAggregate');
// ...
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, sequelize, ReviewImage, SpotImage , Booking} = require('../../db/models');
// const spot = require('../../db/models/spot');
const { ValidationError } = require('sequelize');
const router = express.Router();

const validateInputs = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required.'),
    check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required.'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required.'),
  check('lat')
    .exists({ checkFalsy: true })
    .withMessage("Latitude is required")
    .not()
    .isString()
    .withMessage('Latitude is not valid'),
    check('lng')
    .exists({ checkFalsy: true })
    .withMessage("Longitude is required")
    .not()
    .isString()
    .withMessage('Longitude is not valid'),
    check('name')
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
    check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
    check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required')
    .not()
    .isString()
    .withMessage('Price per day is required'),

  handleInputValidationErrors
];



router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [{
            model: Review,
        },
        {
            model: SpotImage,
        }
    ],


        order: ['id'],

    })
    const spotStars = {};



    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i];
        let reviewsArray = spot.Reviews;
        let sum = 0;

        if (reviewsArray.length !== 0) {

            for (let j = 0; j < reviewsArray.length; j++){

                let reviewStars = reviewsArray[j].stars;

                    sum += reviewStars;

            }
        } else spotStars[spot.id] = 0

        // if (sum !== 0)
        spotStars[spot.id] = sum / reviewsArray.length

        delete spots[i].dataValues.Reviews;
        spots[i].dataValues.avgRating = spotStars[spot.id]



// spots[i].dataValues.SpotImages
if (spots[i].dataValues.SpotImages) {
    let previewImage = spots[i].dataValues.SpotImages[0].url
    spots[i].dataValues.previewImage = previewImage
}else spots[i].dataValues.previewImage = ''
delete spots[i].dataValues.SpotImages

    }


    return res.json({
         Spots: spots,
    })
});



router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [{
            model: Review,
        },
        {
            model: SpotImage,
        }
    ],


        order: ['id'],

    })
    const spotStars = {};



    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i];
        let reviewsArray = spot.Reviews;
        let sum = 0;

        if (reviewsArray.length !== 0) {

            for (let j = 0; j < reviewsArray.length; j++){

                let reviewStars = reviewsArray[j].stars;

                    sum += reviewStars;

            }
        } else spotStars[spot.id] = 0

        if (sum !== 0) spotStars[spot.id] = sum / reviewsArray.length

        delete spots[i].dataValues.Reviews;
        spots[i].dataValues.avgRating = spotStars[spot.id]




if (spots[i].dataValues.SpotImages.length) {
    let previewImage = spots[i].dataValues.SpotImages[0].url
    spots[i].dataValues.previewImage = previewImage
}else spots[i].dataValues.previewImage = ''
delete spots[i].dataValues.SpotImages

    }


   return res.json({
        Spots: spots
    })


})



router.post('/', requireAuth, validateInputs, async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body

    const spot = await Spot.create({
        address,
        ownerId: req.user.dataValues.id,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    return res.json({
        ...spot.dataValues
    })
})

router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    const spotId = req.params.spotId
    const { url, preview } = req.body


let isSpot = await Spot.findOne({
    where: {
        id: spotId
    }
})

if (isSpot) isSpot = isSpot.toJSON()


if (!isSpot  ) {
    // const err = new Error("Spot couldn't be found")
    // err.status = 404
    // next(err)
    res.status(404)
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
 }else if (isSpot.ownerId !== req.user.id){
    // const err = new Error("Access denied: You do not own this Spot")
    // err.status = 403
    // next(err)
    res.status(403)
    return res.json({
      message: "Access denied: You do not own this Spot",
      statusCode: 403
    })
 }
    const newSpotImage = await SpotImage.create({
        spotId: spotId,
        url: url,
        preview: preview,
    })

    return res.json({
        id: spotId,
        url: newSpotImage.url,
        preview: newSpotImage.preview
    })
})


router.get('/:spotId', async(req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findAll({
        where: {
            id: spotId
        },
        include: [{
            model: Review,
            attributes:[]
        },
        {
            model: User, as: "Owner",
            attributes:['id', 'firstName', 'lastName']
        }
    ],
        attributes: {
            include: [
                [
                    //Adding counting number of reviews
                    sequelize.fn("COUNT", sequelize.col("Reviews.spotId")),
                    "numReviews"
                ],

                [
                    //Adding AVG of Stars Rating of each spot
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgStarRating"
                ],
            ],
        },
        group: ['Spot.id', 'Owner.id']

    })

    if (!spot[0]) {
        // const err = new Error("Spot couldn't be found")
        // err.status = 404
        // next(err)
         res.status(404)
         return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    let spotList = []
    spot.forEach((ele) => {
        spotList.push(ele.toJSON())
    })

    const SpotImages = await SpotImage.findAll({
        where: {
            spotId: spotId
        },
        attributes: ["id", "url", "preview"]
    })



    if (spot[0].id){
        return res.json({
            ...spotList[0],SpotImages
        })
    }




})








router.put('/:spotId', requireAuth, validateInputs, async (req, res, next) => {
    const spotId = req.params.spotId
    const {address, city, state, country, lat, lng, name, description, price} = req.body

    const spot = await Spot.findByPk(spotId)
    if (!spot){
        // const err = new Error("Spot couldn't be found")
        // err.status = 404
        // next(err)
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }else if (spot.ownerId !== req.user.id){
        // const err = new Error("Access Denied: you do not have authorization")
        // err.status = 403
        // next(err)
        res.status(403)
        return res.json({
            message: "Access Denied: you do not have authorization",
            statusCode: 403
        })
    } else { spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    return res.send(spot.toJSON())
}

})

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId

    const spot = await Spot.findByPk(spotId)



    if (!spot) {
        // const err = new Error("Couldn't find spot with specified id")
        // err.status = 404
        // next(err)
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    else if (spot.toJSON().ownerId !== req.user.id) {
        // const err = new Error("Access Denied: you do not have authorization")
        // err.status = 403
        // next(err)
        res.status(403)
        return res.json({
            message: "Access Denied: you do not have authorization",
            statusCode: 403
        })

    } else {

        await spot.destroy()
        return res.json({
            message: "Successfully deleted",
            statusCode: 200
          })
    }
})

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {

    const spotId = req.params.spotId

        const allBookings = await Booking.findAll({
            where: {spotId: spotId},
            attributes: ["spotId", 'startDate', "endDate"],
            order: ['spotId']
        })


        const spot = await Spot.findByPk(spotId)


        if (!spot) {
            res.status(404)
           return res.json({
                message: " Spot couldn't be found",
                statusCode: 404
            })
        }else if (spot.toJSON().ownerId !== req.user.id) {
            return res.json({
                Bookings: allBookings
            })
        }else if (!allBookings.length) {
          res.status(404)
          return res.json({
            message: "No Bookings found",
            statusCode: 404
          })
        }
        else {
            const allUserBookings = await Booking.findAll({
                attributes: {
                  include: ['id']
                },
                where: {spotId: spotId},
                include: {
                    model: User,
                    attributes: ["id", "firstName", "lastName"]
                },
                order: ['spotId'],

            })
            return res.json({
                Bookings: allUserBookings
            })
        }

})


router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    const { startDate, endDate } = req.body;
    const { Op } = require("sequelize");

    if (!spot) {
      res.status(404);
      return res.json({
        message: " Spot couldn't be found",
        statusCode: 404,
      });
    }
    if (spot.toJSON().ownerId === req.user.id) {
      res.status(403);
      return res.json({
        message: "Cannot book own spot",
        statusCode: 403,
      });
    }

    const isBooked = await Booking.findAll({
      where: {
        spotId: spotId,
      },
    });

    const startDateToObject = new Date(startDate);
    const endDateToObject = new Date(endDate);

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
          endDate: "endDate cannot be on or before the startDate",
        },
      });
    }

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

      const newBooking = await Booking.create({
        spotId: spotId,
        userId: req.user.id,
        startDate,
        endDate,
      });

      return res.json({
        ...newBooking.toJSON(),
      });


})


module.exports = router;
