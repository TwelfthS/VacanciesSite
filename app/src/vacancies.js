import { Link } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import userService from "./services/user.service"

function Vacancies() {
    const [data, setData] = useState([])
    const [myData, setMyData] = useState([])
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const currentUser = useSelector((state) => state.auth.user)
    useEffect(() => {
      userService.getVacancies()
        .then((response) => setData(response.data.filter((elem) => elem.open)))
        .catch((err) => {
            console.log(err)
        })
    }, [])
    useEffect(() => {
        if (currentUser.role === "Seeker") {
            userService.getMyVacancies(currentUser.id)
            .then((response) => setMyData(response.data))
            .catch((err) => {
                console.log(err)
            })
        }
    }, [currentUser])
    if (!isLoggedIn) {
        return <p>Нужно авторизоваться чтобы просматривать эту страницу</p>
    }
    return (
        <div>
        {data.map((vacancy) => {
            return <div key={vacancy.id} className="card border border-dark mt-3" style={{width: '30rem', height: '100%', marginLeft: '15rem'}}>
                <div className="card-body ">
                    <Link to={"/vacancies/" + vacancy.id} className="card-title vacancy-link">{vacancy.name}</Link>
                    <p className="card-text ">{vacancy.description.substring(0, 50)}{vacancy.description.length > 50 && '...'}</p>
                    {myData.some((elem) => elem.id === vacancy.id) && <p className="responded">Вы откликнулись</p>}
                </div>
            </div>
        })}
        </div>
    )
}

export default Vacancies