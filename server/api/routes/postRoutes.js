const express = require('express')
const router = express.Router()
const controllers = require('../controllers/postControllers')

router.get('/:userId/all-posts',controllers.getAllPosts)
router.post('/:userId/create-posts',controllers.createPost)

module.exports = router
