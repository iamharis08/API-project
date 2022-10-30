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



router.get('/current', requireAuth, async (req, res, next) => {


    const currentUserReviews = await Review.findAll({
        where: {
            id: req.user.id
        },
        include: [{
            model: User,
            attributes: ["id", "firstName", "lastName"]
        },
        {
            model: Spot,
            attributes: {
                exclude: ["description"]
            },
            include: {
                model: SpotImage,
                attributes: [["preview", "previewImage"], "url"]
            }
        },
        {
            model: ReviewImage,
            attributes: ["id", "url"]
        }
    ]
    })
    const reviews = [];

    currentUserReviews.forEach((review) => {
        reviews.push(review.toJSON())
    })

    if (currentUserReviews.length) {

        for (let i = 0; i < reviews.length; i++){

            if (reviews[i].Spot.SpotImages[0].previewImage === 1) {
                const url = reviews[i].Spot.SpotImages[0].url
               delete reviews[0].Spot.SpotImages
               reviews[i].Spot.previewImage = url
            }
        }
        res.json(reviews)
    } else {
        res.status(404)
        return res.json({
            message: "No reviews found"
        })
    }

})









module.exports = router
