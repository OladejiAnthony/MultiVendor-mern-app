//define endpoints

const router = require("express").Router();

const userController = require("../controllers/userControllers");

const { verifyAndAuthorization } = require("../middleware/VerifyToken");

//getUser Route
router.get("/", verifyAndAuthorization, userController.getUser);

//deleteUser Route
router.delete("/", verifyAndAuthorization, userController.deleteUser);

//putUser Route
router.put("/", verifyAndAuthorization, userController.updateUser);

//getUser Route
router.get("/", verifyAndAuthorization, userController.getUser);

module.exports = router;

