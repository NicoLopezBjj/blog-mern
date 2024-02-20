const express = require('express')
const router = express.Router()
const modControllers = require('../controllers/modControllers')




router.post('/:userId/code-generate-send-email',modControllers.acceptRequest)
router.post('/:userId/verify-code',modControllers.verify_code)


module.exports = router