const router = require("express").Router();
const WishController = require('../controllers/wishController')
const verifyAccessToken = require("../middleware/verifyAccessToken");

router
.route('/')
.get(WishController.getWishes)
.post(verifyAccessToken, WishController.createWish)


router
.route('/:wishId')
.get(WishController.getOneWish)
.put(verifyAccessToken, WishController.updateWish)
.delete(verifyAccessToken, WishController.deleteWish)


module.exports = router