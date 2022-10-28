const express = require('express');
// backend/routes/api/users.js
// ...


const { check } = require('express-validator');
const { handleInputValidationErrors } = require('../../utils/validation');
const { reviewAggregate } = require('../../utils/reviewsAggregate');
// ...
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, sequelize, ReviewImage, SpotImage } = require('../../db/models');
const spot = require('../../db/models/spot');
const { ValidationError } = require('sequelize');
const router = express.Router();


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

        if (sum !== 0) spotStars[spot.id] = sum / reviewsArray.length

        delete spots[i].dataValues.Reviews;
        spots[i].dataValues.avgRating = spotStars[spot.id]




if (spots[i].dataValues.SpotImages.length) {
    let previewImage = spots[i].dataValues.SpotImages[0].url
    spots[i].dataValues.previewImage = previewImage
}else spots[i].dataValues.previewImage = ''
delete spots[i].dataValues.SpotImages

    }


    res.json({
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


    res.json({
        Spots: spots
    })


})







router.post('/', requireAuth, async (req, res) => {
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

    res.json({
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
    const err = new Error("Spot couldn't be found")
    err.status = 404
    next(err)
 }else if (isSpot.ownerId !== req.user.id){
    const err = new Error("Access denied: You do not own this Spot")
    err.status = 403
    next(err)
 }
    const newSpotImage = await SpotImage.create({
        spotId: spotId,
        url: url,
        preview: preview,
    })

    res.json({
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

    })

    let spotList = []
    spot.forEach((ele) => {
        spotList.push(ele.toJSON())
    })

    const SpotImages = await SpotImage.findAll({
        where: {
            spotId: spotId
        }
    })



    if (spot[0].id){
        res.json({
            ...spotList[0],SpotImages
        })
    }


    const err = new Error("Spot couldn't be found")
    err.status = 404
    next(err)

})






const validateInputs = [
    check('address')
      .exists({ checkFalsy: true })
      .isLength({ min: 2 })
      .withMessage('Please provide an address.'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required.'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required.'),
    check('lat')
      .exists({ checkFalsy: true })
      .withMessage('Latitude is not valid'),
      check('lng')
      .exists({ checkFalsy: true })
      .withMessage('Longitude is not valid'),
      check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
      check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
      check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required'),
    handleInputValidationErrors
  ];

router.put('/:spotId', requireAuth, validateInputs, async (req, res, next) => {
    const spotId = req.params.spotId
    const {address, city, state, country, lat, lng, name, description, price} = req.body

    const spot = await Spot.findByPk(spotId)
    if (!spot){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }else if (spot.ownerId !== req.user.id){
        const err = new Error("Access Denied: you do not have authorization")
        err.status = 403
        next(err)
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

    res.send(spot.toJSON())
}

})

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId

    const spot = await Spot.findByPk(spotId)


    if (!spot) {
        const err = new Error("Couldn't find spot with specified id")
        err.status = 404
        next(err)
    }
    else if (spot.toJSON().ownerId !== req.user.id) {
        const err = new Error("Access Denied: you do not have authorization")
        err.status = 403
        next(err)

    } else {

        await spot.destroy()
        res.json({
            message: "Successfully deleted",
            statusCode: 200
          })
    }
})

module.exports = router;
