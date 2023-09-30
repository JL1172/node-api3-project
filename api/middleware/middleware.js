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

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}