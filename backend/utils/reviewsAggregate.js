
function reviewAggregate(spots) {
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
}

module.exports = {
    reviewAggregate
}
