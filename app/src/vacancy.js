import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import userService from "./services/user.service"
import Vacancies from "./vacancies"
import MyVacancies from "./my-vacancies"

function Vacancy({ my }) {
    const params = useParams()
    const [data, setData] = useState([])
    const [myVacancies, setMyVacancies] = useState([])

    const vacancyId = params.vacancyId
    const currentUser = useSelector((state) => state.auth.user)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    useEffect(() => {
      userService.getVacancy(vacancyId)
        .then((response) => setData(response.data.vacancy))
        .catch((err) => {
            console.log(err)
        })
    }, [vacancyId])
    useEffect(() => {
        if (currentUser && currentUser.role === "Seeker") {
            userService.getMyVacancies(currentUser.id)
                .then((response) => setMyVacancies(response.data))
        }
    }, [currentUser])
    const subToVacancy = () => {
        userService.subToVacancy(vacancyId, "subscribe")
        .then(() => {
            window.location.reload()
            return
        })
        .catch(err => {
            console.log(err)
        })
    }
    const unsubFromVacancy = () => {
        userService.subToVacancy(vacancyId, "unsubscribe")
        .then(() => {
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }
    if (!isLoggedIn) {
        return <p>Нужно авторизоваться чтобы просматривать эту страницу</p>
    }
    if (!data || !data.open || (my && currentUser.role !== "Seeker")) {
        return <p>Page not found</p>
    }
    return (
        <div className="row">
            <div className="col-6">
                {my ? <MyVacancies /> : <Vacancies />}
            </div>
            <div className="col-6 border p-5" style={{height: '100rem'}}>
                <h5>{data.name}</h5>
                <p>{data.description}</p>
                <p>Разместил вакансию: {data.ownerName}</p>
                {data.salary && <p>Зарплата: {data.salary}</p>}
                {currentUser.role === "Seeker" && !myVacancies.some((elem) => elem.id === data.id) && <button className="subscribe-button" onClick={subToVacancy}>Откликнуться</button>}
                {currentUser.role === "Seeker" && myVacancies.some((elem) => elem.id === data.id) && <button className="subscribe-button" onClick={unsubFromVacancy}>Отменить отклик</button>}
            </div>
        </div>
    )
}

export default Vacancy