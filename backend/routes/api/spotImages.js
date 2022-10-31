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


    const spotImage = await SpotImage.findOne({
        where: {
            id: imageId
        }
    })
    if (!spotImage){
        res.status(404)
        return res.json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        })
    }
    const spotId = spotImage.toJSON().spotId
    const spot = await Spot.findOne({
        where: {
            id:spotId,
        }
    })

    if (spot.toJSON().ownerId !== req.user.id){
        res.status(403)
        return res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }else {
       await spotImage.destroy()
       return res.json({
        message: "Successfully deleted",
        statusCode: 200
       })
    }
})

module.exports = router
