const router = require('express').Router();
const reviewController = require('../../controller/reviewController');

router.route('/')
    .get(reviewController.getReviews)
    .post(reviewController.uploadReview)
    .patch(reviewController.updateReview)
    .delete(reviewController.deleteReview);

router.route('/:username')
    .get(reviewController.getOneUserReview);
    
module.exports = router;