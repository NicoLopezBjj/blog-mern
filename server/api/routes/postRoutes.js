const express = require('express')
const router = express.Router()
const controllers = require('../controllers/postControllers')

router.get('/:userId/all-posts',controllers.getAllPosts)
router.get('/:userId/:postId/get-post', controllers.getPost)
router.get('/all', controllers.allPosts)
router.post('/:userId/create-post',controllers.createPost)

module.exports = router
