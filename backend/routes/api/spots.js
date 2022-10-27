const express = require('express');
// backend/routes/api/users.js
// ...


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, sequelize, ReviewImage, SpotImage } = require('../../db/models');
const spot = require('../../db/models/spot');
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
        // attributes: {
        //     include: [
        //         [
        //             //Adding AVG of Stars Rating of each spot
        //             sequelize.fn("AVG", sequelize.col("Reviews.stars")),
        //             "avgRating"
        //         ],
        //             //Adding column of Spot Images Url aliased as previewImage
        //         [
        //             sequelize.col("SpotImages.url"),
        //             "previewImage"
        //         ]
        //     ],
        // },

        order: ['id'],
        // group: ["address", "city", "state", "country"],
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
        // attributes: {
        //     include: [
        //         [
        //             //Adding AVG of Stars Rating of each spot
        //             sequelize.fn("AVG", sequelize.col("Reviews.stars")),
        //             "avgRating"
        //         ],
        //             //Adding column of Spot Images Url aliased as previewImage
        //         [
        //             sequelize.col("SpotImages.url"),
        //             "previewImage"
        //         ]
        //     ],
        // },


        // group: ["address", "city", "state", "country"],
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








module.exports = router;
