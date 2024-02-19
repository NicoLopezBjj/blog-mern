const express = require('express')
const router = express.Router()
const modControllers = require('../controllers/modControllers')




router.post('/:userId/code-generate-send-email',modControllers.acceptRequest)


module.exports = router