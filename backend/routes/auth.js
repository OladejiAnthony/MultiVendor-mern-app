//define endpoints

const router = require('express').Router();

const authController = require('../controllers/authController')

//Register Route
router.post('/register', authController.createUser);

//Login Route
router.post('/login', authController.loginUser);

module.exports = router;

