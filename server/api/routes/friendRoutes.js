const express = require('express')
const router = express.Router()
const controllers = require('../controllers/friendControllers')


router.get("/:userId/get", controllers.get_friend_info)
router.get("/:userId/get-posts", controllers.get_friend_posts)


module.exports = router