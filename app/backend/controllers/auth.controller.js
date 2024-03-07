const models = require("../models/index.js")
const config = require("../config/auth.config.js")
const User = models.User

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.signup = (req, res) => {
  User.create({
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role
  })
    .then(user => {
      const token = jwt.sign({ id: user.id },
                            config.secret,
                            {
                              algorithm: 'HS256',
                              allowInsecureKeySizes: true,
                              expiresIn: 86400, // 24 hours
                            })
      const vacancies = []
      user.getVacancies().then(vacs => {
        for (let i = 0; i < vacs.length; i++) {
          vacancies.push(vacs[i].name)
        }
        res.status(200).send({
          id: user.id,
          name: user.name,
          vacancies: vacancies,
          role: user.role,
          accessToken: token
        })
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

exports.signin = (req, res) => {
    User.findOne({
      where: {
        name: req.body.name
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "Пользователь не найден" })
        }
  
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        )
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Неверный пароль!"
          })
        }
  
        const token = jwt.sign({ id: user.id },
                                config.secret,
                                {
                                  algorithm: 'HS256',
                                  allowInsecureKeySizes: true,
                                  expiresIn: 86400, // 24 hours
                                })
  
        const vacancies = []
        if (user.role === "Employer") {
          user.getVacancies().then(vacs => {
            for (let i = 0; i < vacs.length; i++) {
              vacancies.push(vacs[i].id)
            }
            res.status(200).send({
              id: user.id,
              name: user.name,
              vacancies: vacancies,
              role: user.role,
              accessToken: token
            })
          })
        } else if (user.role === "Seeker") {
          user.getSubbedVacancy().then(vacs => {
            for (let i = 0; i < vacs.length; i++) {
              vacancies.push(vacs[i].id)
            }
            res.status(200).send({
              id: user.id,
              name: user.name,
              vacancies: vacancies,
              role: user.role,
              accessToken: token
            })
          })
        } else {
          res.status(404).send({ message: "No role somehow?"})
        }
        
      })
      .catch(err => {
        res.status(500).send({ message: err.message })
      })
  }