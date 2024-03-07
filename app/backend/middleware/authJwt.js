const jwt = require("jsonwebtoken")
const config = require("../config/auth.config.js")
const models = require('../models/index.js')

const User = models.User

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      })
    }
  
    jwt.verify(token,
              config.secret,
              (err, decoded) => {
                if (err) {
                  return res.status(401).send({
                    message: "Unauthorized!",
                  })
                }
                req.id = decoded.id
                next()
              })
}

isEmployer = (req, res, next) => {
  User.findByPk(req.id).then(user => {
    if (user.role === "Employer") {
      next()
      return
    }
    res.status(403).send({
      message: "Только для рекрутеров"
    })
    return
  })
}

isSeeker = (req, res, next) => {
  User.findByPk(req.id).then(user => {
    if (user.role === "Seeker") {
      next()
      return
    }
    res.status(403).send({
      message: "Только для соискателей"
    })
    return
  })
}

const authJwt = {
    verifyToken,
    isEmployer,
    isSeeker
}

module.exports = authJwt