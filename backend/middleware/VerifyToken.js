const jwt = require("jsonwebtoken");
 
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
      if (err) {
        //if not a valid token
        //Response status (403) - Forbidden
        return res.status(403).json({
          status: false,
          message: "invalid token",
        });

      }

      req.user = user;
      console.log(user)
      next();
    });
  }
};

//verify if a user is a client, driver, vendor, admin
const verifyAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.userType === "Client" ||
      req.user.userType === "Vendor" ||
      req.user.userType === "Admin" ||
      req.user.userType === "Driver"
    ) {
      next();
    } else {
      //Response status (403) - Forbidden
      res.status(403).json({
        status: false,
        message: "You are not authorized",
      });
    }
  });
};

//verify if a user is a  vendor, admin
const verifyVendor = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Vendor" || req.user.userType === "Admin") {
      next();
    } else {
      //Response status (403) - Forbidden
      res.status(403).json({
        status: false,
        message: "You are not authorized",
      });
    }
  });
};

//verify if a user is a driver, admin
const verifyDriver = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Driver" || req.user.userType === "Admin") {
      next();
    } else {
      //Response status (403) - Forbidden
      res.status(403).json({
        status: false,
        message: "You are not authorized",
      });
    }
  });
};

//verify if a user is an admin
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Admin") {
      next();
    } else {
      //Response status (403) - Forbidden
      res.status(403).json({
        status: false,
        message: "You are not authorized",
      });
    }
  });
};

module.exports = {
  verifyToken,
  verifyAndAuthorization,
  verifyVendor,
  verifyDriver,
  verifyAdmin,
};

//Role based Authentication- Client, Driver, Vendor, Admin accounts
