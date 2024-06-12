//define endpoints

const router = require("express").Router();

const restaurantController = require("../controllers/restaurantController");

const { verifyAndAuthorization, verifyVendor } = require("../middleware/VerifyToken");

//POST Route
router.post("/", verifyAndAuthorization, restaurantController.addRestaurant);

//GET Route
router.get("/byId/:id", restaurantController.getRestaurant);

//GET-Random Route
router.get("/:code",restaurantController.getRandomRestaurants);

//DELETE Route
router.delete("/:id", verifyVendor, restaurantController.deleteRestaurant);

//PATCH Route
router.patch("/:id", verifyVendor, restaurantController.serviceAvailablity);


module.exports = router;

