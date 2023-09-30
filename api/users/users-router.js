const express = require('express');
const UserData = require("./users-model");
const PostData = require("../posts/posts-model"); 
const {validateUserId} = require("../middleware/middleware");
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async(req, res, next) => {
  try {
    const users = await UserData.get();
    res.status(200).json(users)
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateUserId, (req, res, next) => {
  res.json(req.user); 
});

router.post('/', (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((error,req,res,next)=> {
  res.status(error.status || 500).json({
    message : error.message,
    customMessage : "error in user router",
  })
})
// do not forget to export the router
module.exports = router;
