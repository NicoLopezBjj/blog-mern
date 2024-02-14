const express = require('express')
const router = express.Router()
const modControllers = require('../controllers/modControllers')


router.post('/:userId/code-generate',modControllers.get_code)


module.exports = router