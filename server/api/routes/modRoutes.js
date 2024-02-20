const express = require('express')
const router = express.Router()
const modControllers = require('../controllers/modControllers')

router.get('/get-reqs', modControllers.get_requests)
router.get('/:userId/get-req',modControllers.get_request)

router.post('/request', modControllers.sent_request)
router.post('/:userId/code-generate-send-email',modControllers.acceptRequest)
router.post('/:userId/verify-code',modControllers.verify_code)

router.delete('/:userId/reject-req', modControllers.rejectRequest)


module.exports = router