const router = require("express").Router();
const UserController = require('../controllers/userController')

router.post('/registration', UserController.registr)
router.post('/login', UserController.login)
router.delete('/logout', UserController.logout)

module.exports = router