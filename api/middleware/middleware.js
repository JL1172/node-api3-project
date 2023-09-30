const UserData = require("../users/users-model");


function logger(req, res, next) {
  console.log(`
    REQUEST METHOD : ${req.method}
    REQUEST URL : ${req.url}
    TIMESTAMP : ${new Date()}
  `)
  next();
}

async function validateUserId(req, res, next) {
    try {
      const {id} = req.params;
      const user = await UserData.getById(id);
      if (!user) {
        next({status : 404, message : "user not found"})
      } else {
        req.user = user;
        next();
      }
    } catch (err) {
      next(err);
    }
}

async function validateUser(req, res, next) {
    try {
      const {name} = req.body;
      if (!name) {
        next({status : 400, message : "missing required name field"});
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
}

async function validatePost(req, res, next) {
   try {
      const {text} = req.body;
      if (!text) {
        next({status : 400, message : "missing required text field"});
      } else {
        next();
      }
   } catch (err) {next(err)};
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}