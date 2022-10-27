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
            attributes: [] // don't return any associated data from Challenges
        },
        {
            model: SpotImage,
            attributes: []
        }
    ],
        attributes: {
            include: [
                [
                    //Adding AVG of Stars Rating of each spot
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating"
                ],
                    //Adding column of Spot Images Url aliased as previewImage
                [
                    sequelize.col("SpotImages.url"),
                    "previewImage"
                ]
            ],
        },


        group: ["address", "city", "state", "country"],
    })

    res.json({
        Spots: spots,
    })
});

router.get('/current', requireAuth, async (req, res) => {
    const currentUserSpots = await Spot.findAll({
        where: {
            ownerId: req.user.dataValues.id
        },
        include: [{
            model: Review,
            attributes: [] 
        },
        {
            model: SpotImage,
            attributes: []
        }
    ],
        attributes: {
            include: [
                [
                    //Adding AVG of Stars Rating of each spot
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating"
                ],
                    //Adding column of Spot Images Url aliased as previewImage
                [
                    sequelize.col("SpotImages.url"),
                    "previewImage"
                ]
            ],
        },


        group: ["address", "city", "state", "country"],
    })

    res.json({
        Spots: currentUserSpots
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
