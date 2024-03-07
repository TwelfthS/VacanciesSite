const models = require('../models/index.js')

const User = models.User


checkDuplicateUsername = (req, res, next) => {
    User.findOne({
      where: {
        name: req.body.name
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Username is already in use!"
        })
        return
      }
  
      next()
    })
  }

const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername
}

module.exports = verifySignUp