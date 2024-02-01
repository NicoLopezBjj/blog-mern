const express = require("express")
const router = express.Router()
const controllers = require("../controllers/usuariosControllers")

router.post("/signup", controllers.signup_post)

router.get("/signin", controllers.signin_get)

router.post("/signin", controllers.signin_post)

module.exports = router