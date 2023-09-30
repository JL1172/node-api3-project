const express = require('express');
const UserData = require("./users-model");
const PostData = require("../posts/posts-model");
const { validateUserId, validateUser, validatePost } = require("../middleware/middleware");
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res, next) => {
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

router.post('/', validateUser, async(req, res, next) => {
    try {
      const postedUser = await UserData.insert(req.body);
      res.status(201).json(postedUser); 
    } catch (err) {
      next(err);
    }
});

router.put('/:id',[validateUserId,validateUser], async(req, res, next) => {
  try {
    const updatedUser = await UserData.update(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', validateUserId, async(req, res, next) => {
  try {
    const deletedUser = await UserData.remove(req.params.id);
    res.status(200).json(deletedUser);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/posts', validateUserId, async(req, res, next) => {
  try {
    const postOfUser = await PostData.getById(req.params.id);
    res.status(200).json(postOfUser);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/posts',[validateUserId,validatePost], async(req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const newPost = await PostData.insert(req.body);
    res.status(201).json(newPost);
  } catch (err) {next(err)}
});

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "error in user router",
  })
})
// do not forget to export the router
module.exports = router;
