import express from 'express';
import{ createPost, getPost, getPosts, updatePost } from '../controllers/postController.js'
const router = express.Router();



// get all posts
router.get('/',getPosts);


//get a single post
router.get('/:id',getPost);


// create new post
router.post('/',createPost); 


//update
router.put('/:id', updatePost);


//delete
router.delete('/:id',updatePost);

export default router;