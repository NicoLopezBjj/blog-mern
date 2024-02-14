const express = require('express')
const router = express.Router()
const controllers = require('../controllers/postControllers')
const likeControllers = require('../controllers/likeControllers')

router.get('/:userId/all-posts',controllers.getUserPosts)
router.get('/:postId/get-post', controllers.getPost)
router.get('/:postId/visit', controllers.visit)
router.get('/all', controllers.allPosts)

router.get('/:userId/:postId/like', controllers.like)
router.get('/:userId/:postId/no-like', controllers.no_like)

router.get('/:postId/comments', controllers.get_comments)
router.get('/:userId/:postId/:commentId/like-comment',controllers.like_comment)
router.get('/:userId/:postId/:commentId/no-like-comment',controllers.no_like_comment)

router.get('/:userId/:postId/get-like', likeControllers.get_post_like)
router.get('/:userId/:postId/:commentId/get-c-like', likeControllers.get_comment_like)

router.post('/:userId/create-post',controllers.createPost)
router.post('/:postId/add-comment', controllers.add_comment)
router.post('/:postId/:commentId/edit-comment', controllers.edit_comment)

router.delete('/:postId/:commentId/delete-comment', controllers.delete_comment)

module.exports = router
