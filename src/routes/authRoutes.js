const express = require("express");
const router = express.Router();
const {register, login , getProfile , updateProfile} = require("../controllers/authController");

const {authenticate} = require = ("../Middlewares/authMiddleware.js");

const { registerValidator , loginValidator , updateProfileValidator } = require("../validators/authValidator");

router.post("/login", loginValidator , login);
router.post('/register' , register , registerValidator);

router.get("/profile", authenticate , getProfile);
router.patch("profile", authenticate , updateProfile , updateProfileValidator);


module.exports = router;