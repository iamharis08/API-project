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
const { create, escapeRegExp } = require('lodash');
const router = express.Router();



router.get('/current', requireAuth, async (req, res, next) => {


    const currentUserReviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [{
            model: User,
            attributes: ["id", "firstName", "lastName"]
        },
        {
            model: Spot,
            attributes: {
                exclude: ["description", "createdAt", "updatedAt"]
            },
            include: {
                model: SpotImage,
                attributes: ["preview", "url"]
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

    if (reviews.length) {

        for (let i = 0; i < reviews.length; i++){

            if (reviews[i].Spot.SpotImages[0].preview === true) {
                const url = reviews[i].Spot.SpotImages[0].url
               delete reviews[0].Spot.SpotImages
               reviews[i].Spot.previewImage = url
            }
        }
        return res.json({Reviews: reviews})
    } else {
        res.status(404)
        return res.json({
            message: "Reviews couldn't be found",
            statusCode: 404
        })
    }

})



router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const reviewId = parseInt(req.params.reviewId)
    const url = req.body.url
    const review = await Review.findByPk(reviewId)
    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: reviewId,

        },
    })

    if (!review){
        res.status(404)
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    if (reviewImages.length >= 10) {
        res.status(403)
        return res.json({
            message: "Maximumn number of images for this resource was reached",
            statusCode: 403
        })
    }

    if (review.toJSON().userId === req.user.id){
        const newReviewImage = await ReviewImage.create({
            reviewId,
            url,
        })
        const newImageFormatted = {
            ...newReviewImage.toJSON()
        }

        delete newImageFormatted.createdAt
        delete newImageFormatted.updatedAt
        delete newImageFormatted.reviewId
        return res.json({
            ...newImageFormatted
        })
      }else{
        res.status(403)
        return res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

})
const validReviewInput = [
    check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required')
    .isString()
    .withMessage('Review text is required'),
    check('stars')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5 ')
    .exists()
    .not()
    .isString()
    .withMessage('Stars must be an integer from 1 to 5 '),
    handleInputValidationErrors
  ]
router.put('/:reviewId', requireAuth, validReviewInput, async (req, res, next) => {
    const reviewId = parseInt(req.params.reviewId)
    const { review, stars } = req.body
    const editReview = await Review.findByPk(reviewId)
    if (!editReview){
        res.status(404)
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    if (editReview.toJSON().userId !== req.user.id){
        res.status(403)
        return res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }else {
        editReview.update({
            review,
            stars: parseInt(stars)
        })
        return res.json({
            ...editReview.toJSON()
        })
    }

})

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const reviewId = parseInt(req.params.reviewId)
    const review = await Review.findByPk(reviewId)
    if (!review){
        res.status(404)
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    if (review.toJSON().userId !== req.user.id){
        res.status(403)
        return res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }else {
       await review.destroy()
       return res.json({
        message: "Successfully deleted",
        statusCode: 200
       })
    }
})


module.exports = router
