const Restaurant = require("../models/Restaurant");

module.exports = {
  addRestaurant: async (req, res) => {
    const newRestaurant = new Restaurant(req.body);

    try {
      //save data to db
      await newRestaurant.save();

      res.status(201).json({
        status: true,
        message: "Restaurant succcessfully created",
      });
    } catch (error) {
      res
        .status(500)
        .json({ status: false, message: "Error creating Restaurant", error: error.message });
    }
  },

  serviceAvailablity: async (req, res) => {
    const restaurantId = req.params.id;
    //OR - const {restaurantId} = req.params;

    try {
      const restaurant = await Restaurant.findById(restaurantId);

      if(!restaurant) {
         return res.status(403).json({
            status: false,
            message: "Restaurant not found",
          });
      }

      restaurant.isAvailable = !restaurant.isAvailable

      await restaurant.save();

      res.status(200).json({
        status: true,
        message: "Availability successfully toggled",
        isAvailable: restaurant.isAvailable
      });

    } catch (error) {
      res
        .status(500)
        .json({ status: false, message: "Error toggling Restaurant availability" });
    }
  },

  getRestaurant: async (req, res) => {
    const restaurantId = req.params.id;

    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if(!restaurant) {
           return res.status(404).json({
              status: false,
              message: "Restaurant not found",
            });
        }

      res.status(200).json(restaurant);
    } catch (error) {
      res
        .status(500)
        .json({ status: false, message: "Error retrieving the restaurant" });
    }
  },

  getRandomRestaurants: async (req, res) => {

    try {
        let randomRestaurant = [];
        if(req.params.code) {
            //creating pipeline
            randomRestaurant = await Restaurant.aggregate([
                {$match: {code: req.params.code}},
                {$sample: {size: 5}},
                {$project: {__v: 0}}
            ])
        }

        if(!randomRestaurant.length) {
            //creating pipeline
            randomRestaurant = await Restaurant.aggregate([
                {$sample: {size: 5}},
                {$project: {__v: 0}}
            ])
        }

        if(randomRestaurant.length) {
            return res.status(200).json(randomRestaurant);
        }


    } catch (error) {
      res
        .status(500)
        .json({ status: false, message: "Error finding restaurants" });
    }
  },

  deleteRestaurant: async (req, res) => {
    const restaurantId = req.params.id;

    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if(!restaurant) {
           return res.status(403).json({
              status: false,
              message: "Restaurant not found",
            });
        }

        await Restaurant.findByIdAndDelete(restaurantId);

      res.status(200).json({
        status: true,
        message: "Restaurant succcessfully deleted",
      });
    } catch (error) {
      res
        .status(500)
        .json({ status: false, message: "Error deleting Restaurant" });
    }
  },


};

