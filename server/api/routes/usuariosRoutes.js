const express = require("express")
const router = express.Router()
const passport = require('passport')
const controllers = require("../controllers/usuariosControllers")

router.post("/signup", controllers.signup_post)

router.get("/signin",passport.authenticate('jwt', { session: false }), controllers.signin_get)

router.post("/signin", controllers.signin_post)

router.get("/user", controllers.get_user)

router.get("/auth", controllers.auth)

router.get("/signout", controllers.sign_out)

module.exports = router