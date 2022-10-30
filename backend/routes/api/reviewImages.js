const express = require('express');
// backend/routes/api/users.js
// ...


const { check } = require('express-validator');
const { handleInputValidationErrors } = require('../../utils/validation');
const { reviewAggregate } = require('../../utils/reviewsAggregate');
// ...
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, sequelize, ReviewImage, SpotImage , Booking} = require('../../db/models');

const { ValidationError } = require('sequelize');
const { create, escapeRegExp } = require('lodash');
const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const imageId = parseInt(req.params.imageId)


    const reviewImage = await ReviewImage.findByPk(imageId)
    console.log(reviewImage)
    if (!reviewImage){
        res.status(404)
        return res.json({
            message: "Review Image couldn't be found",
            statusCode: 404
        })
    }

    const review = await Review.findOne({
        where: {
            id: reviewImage.toJSON().reviewId
        }
    })

    if (review.toJSON().userId !== req.user.id){
        res.status(403)
        return res.json({
            message: "Access Denied: you do not have permission",
            statusCode: 403
        })
    }else {
       await reviewImage.destroy()
       return res.json({
        message: "Successfully deleted",
        statusCode: 200
       })
    }
})






module.exports = router
