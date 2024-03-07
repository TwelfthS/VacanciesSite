const express = require('express')
const cors = require('cors')
const { Sequelize } = require('sequelize')
const authController = require("./controllers/auth.controller")
const userController = require("./controllers/user.controller")
const { authJwt } = require("./middleware")

const { verifySignUp } = require("./middleware")


const config = require('./config/config.json').development

const sequelize =
    new Sequelize(config.database,
    config.username,
    config.password, {
        host: 'localhost',
        dialect: 'mysql'
    })


sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token"
  )
  next()
})

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`)
  })

app.post("/signup", verifySignUp.checkDuplicateUsername, authController.signup)

app.post("/signin", authController.signin)

app.get('/vacancies', [authJwt.verifyToken], userController.getVacancies)

app.get('/vacancies/:id', [authJwt.verifyToken], userController.getVacancy)

app.delete('/vacancies/', [authJwt.verifyToken, authJwt.isEmployer], userController.deleteVacancy)

app.get('/my-vacancies', [authJwt.verifyToken, authJwt.isSeeker], userController.myVacancies)

app.put('/vacancies/', [authJwt.verifyToken, authJwt.isSeeker], userController.subToVacancy)

app.post('/vacancies', [authJwt.verifyToken, authJwt.isEmployer], userController.createVacancy)
