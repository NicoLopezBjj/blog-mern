const express = require("express")
const router = express.Router()
const passport = require('passport')
const controllers = require("../controllers/usuariosControllers")

router.post("/signup", controllers.signup_post)

router.get("/signin",passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Ruta protegida accedida con éxito' });
})

router.post("/signin", controllers.signin_post)

module.exports = router