import {
    Link
  } from "react-router-dom"
  import React, { useState, useEffect } from "react"
  import { useSelector } from "react-redux"
  import userService from "./services/user.service"

function MyVacancies() {
    const [data, setData] = useState([])
    const currentUser = useSelector((state) => state.auth.user)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    useEffect(() => {
        userService.getMyVacancies(currentUser.id)
        .then((response) => setData(response.data))
        .catch((err) => {
            console.log(err)
        })
    }, [currentUser.id])
    if (!isLoggedIn) {
        return <p>Нужно авторизоваться как соискатель, чтобы просматривать эту страницу</p>
    }
    return (
        <div>
            {data.map((vacancy) => {
                return <div className="card border border-dark mt-3" style={{width: '30rem', height: '100%', marginLeft: '15rem'}}>
                    <div className="card-body ">
                        <Link to={"/my-vacancies/" + vacancy.id} className="card-title vacancy-link">{vacancy.name}</Link>
                        <p className="card-text ">{vacancy.description.substring(0, 50)}{vacancy.description.length > 50 && '...'}</p>
                        <p  className="responded">Вы откликнулись</p>
                    </div>
                </div>
            })}
        </div>
    )
}

export default MyVacancies