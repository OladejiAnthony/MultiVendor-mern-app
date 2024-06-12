const User = require("../models/User");
const Crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");

module.exports = {
  createUser: async (req, res) => {
    const user = req.body;
    try {
      // Check if user is authenticated on firebase
      await admin.auth().getUserByEmail(user.email);

      // Return response status(400) - bad request
      return res.status(400).json({ message: "Email already registered" });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        try {
          // If user is not authenticated on firebase, create a new user account
          const userResponse = await admin.auth().createUser({
            email: user.email,
            password: user.password,
            emailVerified: false,
            disabled: false,
          })

          //console.log(userResponse.uid);

          // Create new account in mongodb
          const newUser = new User({
            username: user.username,
            email: user.email,
            password: Crypto.AES.encrypt(
              user.password,
              process.env.SECRET
            ).toString(), // Password encrypted
            uid: userResponse.uid,
            userType: "Client",
          })

          // Save user to db
          await newUser.save();

          // Response status (201) - user account created
          return res.status(201).json({ status: true })
        } catch (error) {
          console.error(error);
          // Response status code(500) - internal service error
          return res.status(500).json({ status: false, error: "Error creating user" });
        }
      }
      // Handle other errors
      return res.status(500).json({ status: false, error: "Error checking user" });
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne(
        { email: req.body.email },
        { __v: 0, updatedAt: 0, createdAt: 0 }
      );
      //response status(401) - Unauthroized
      //if user email isnt found
      !user && res.status(401).json("Wrong Credentials");

      //continue if user is found
      const decryptedpassword = Crypto.AES.decrypt(
        user.password,
        process.env.SECRET
      );
      const decrypted = decryptedpassword.toString(Crypto.enc.Utf8);

      //response status (401) - Unauthorized
      //if user password isnt found
      decrypted !== req.body.password && res.status(401).json("Wrong Password");

      const userToken = jwt.sign(
        {
          id: user._id,
          userType: user.userType,
          email: user.email,
        },

        
        process.env.JWT_SEC,
        { expiresIn: "21d" }
      );

      const { password, email, ...others } = user._doc;

      //send response status(200) - OK
      return res.status(200).json({ ...others, userToken });
    } catch (error) {
      console.error(error);
      //response status code(500) - internal service error
      return res.status(500).json({ status: false, error: error.message });
    }
  },

  
};



