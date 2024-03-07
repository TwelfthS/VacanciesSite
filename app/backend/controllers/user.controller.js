const models = require("../models/index.js")

const User = models.User
const Vacancy = models.Vacancy

exports.getVacancies = (req, res) => {
    Vacancy.findAll()
    .then((vacancies) => {
        res.json(vacancies)
    })
}

exports.getVacancy = (req, res) => {
    Vacancy.findOne({
        where: {
            id: req.params.id
        }
    })
    .then((vacancy) => {
        if (!vacancy || vacancy === null) {
            res.status(404).send({ message: "no such page" })
            return
        }
        User.findOne({
            where: {
                id: req.id
            }
        }).then((user) => {
            if (user.id === vacancy.ownerId) {
                vacancy.getSubbedUser().then((users) => {
                    res.json({ vacancy, users })
                })
            } else {
                res.json({ vacancy })
            }
        })
    })
    .catch((err) => {
        res.status(404).send(err)
    })
}

exports.deleteVacancy = (req, res) => {
    Vacancy.update({
        open: false
    }, {
        where: {
          id: req.body.vacancyId,
          ownerId: req.id
        }
    })
    .then(() => {
        res.send()
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}

exports.myVacancies = (req, res) => {
    User.findOne({
        where: {
          id: req.id
        }
    }).then(user => {
        if (!user) {
          res.status(404).send({ message: "no such user" })
        } else {
          user.getSubbedVacancy().then(vacancies => {
            vacancies = vacancies.filter((elem) => elem.open)
            res.status(200).send(vacancies)
          })
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        })
    })
}

exports.createVacancy = (req, res) => {
    User.findOne({
        where: {
            id: req.id
        }
    })
    .then((user) => {
        Vacancy.create({
            name: req.body.title,
            description: req.body.description,
            ownerId: req.id,
            ownerName: user.name,
            salary: req.body.salary,
            open: true
        })
        .then((vacancy) => {
            res.status(200).send(vacancy)
        })
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.subToVacancy = (req, res) => {
    Vacancy.findOne({
        where: {
          id: req.body.vacancyId
        }
    })
    .then((vacancy) => {
        User.findOne({
            where: {
                id: req.id
            }
        })
        .then((user) => {
            if (req.body.action === "subscribe") {
                user.addSubbedVacancy(vacancy, { through: "UserVacancy" })
                .then(() => {
                    vacancy.addSubbedUser(user, { through: "UserVacancy" })
                    .then(() => {
                        res.status(200).send()
                    })
                })
            } else if (req.body.action === "unsubscribe") {
                user.removeSubbedVacancy(vacancy, { through: "UserVacancy" })
                .then(() => {
                    vacancy.removeSubbedUser(user, { through: "UserVacancy" })
                    .then(() => {
                        res.status(200).send()
                    })
                })
            } else {
                res.status(500).send()
            }
        })
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}