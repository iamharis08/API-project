const express = require('express');
// backend/routes/api/users.js
// ...


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, sequelize, ReviewImage, SpotImage } = require('../../db/models');
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
                    // `Challenges` here should be the name of the table, not the model
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating"
                ],
                [
                    sequelize.col("SpotImages.url"),
                    "previewImage"
                ]
            ],
        },


        group: ['ownerId']
    })

    res.json({
        Spots: spots,
    })
});

module.exports = router;
