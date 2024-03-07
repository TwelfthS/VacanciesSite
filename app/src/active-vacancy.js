import { useParams, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import userService from "./services/user.service"
import ActiveVacancies from "./active-vacancies"

function ActiveVacancy() {
    const params = useParams()
    const [data, setData] = useState([])
    const [count, setCount] = useState(-1)

    const navigate = useNavigate()

    const vacancyId = params.vacancyId
    const currentUser = useSelector((state) => state.auth.user)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    useEffect(() => {
      userService.getVacancy(vacancyId)
        .then((response) => {
            setData(response.data.vacancy)
            if (response.data.users) {
                setCount(response.data.users.length)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }, [vacancyId])
    const closeVacancy = () => {
        userService.closeVacancy(vacancyId)
        .then(() => {
            navigate("/active-vacancies")
        })
        .catch((err) => {
            console.log(err)
        })
    }
    if (!isLoggedIn) {
        return <p>Нужно авторизоваться чтобы просматривать эту страницу</p>
    }
    if (!data || currentUser.id !== data.ownerId) {
        return <p>Page not found</p>
    }
    return (
        <div className="row">
            <div className="col-6">
                <ActiveVacancies />
            </div>
            <div className="col-6 border p-5" style={{height: '100rem'}}>
                <h5>{data.name}</h5>
                <p>{data.description}</p>
                {data.salary && <p>Зарплата: {data.salary}</p>}
                {count >= 0 && <p>Человек откликнулось: {count}</p>}
                {data.ownerId === currentUser.id && data.open && <button className="close-button" onClick={closeVacancy}>Закрыть вакансию</button>}
                {!data.open && <p>Вакансия закрыта</p>}
            </div>
        </div>
    )
}

export default ActiveVacancy