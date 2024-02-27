const express = require('express')
const router = express.Router()
const controllers = require('../controllers/friendControllers')

router.get("/:userId/get-requests-friend",controllers.get_requests_friend)
router.get("/:userId/get-sent-requests", controllers.get_sent_requests)
router.get("/:userId/get-received-requests", controllers.get_received_requests)
router.get("/:userId/get", controllers.get_friend_info)
router.get("/:userId/get-posts", controllers.get_friend_posts)
router.post("/:userId/sent-request-friend",controllers.create_request_friend)
router.post("/:userId/add-friend/:requestId",controllers.accept_request_friend)


module.exports = router