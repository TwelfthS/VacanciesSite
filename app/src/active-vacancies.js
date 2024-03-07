import { Link } from "react-router-dom"
  import React, { useState, useEffect } from "react"
  import { useSelector } from "react-redux"
  import userService from "./services/user.service"

function ActiveVacancies() {
    const [data, setData] = useState([])
    const currentUser = useSelector((state) => state.auth.user)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    useEffect(() => {
        userService.getVacancies()
        .then((response) => setData(response.data.filter((elem) => elem.ownerId === currentUser.id)))
        .catch((err) => {
            console.log(err)
        })
    }, [currentUser.id])
    if (!isLoggedIn || currentUser.role !== "Employer") {
        return <p>Нужно авторизоваться как рекрутер, чтобы просматривать эту страницу</p>
    }
    return (
        <div>
            {data.map((vacancy) => {
                return <div key={vacancy.id} className="card border border-dark mt-3" style={{width: '30rem', height: '100%', marginLeft: '15rem'}}>
                            <div className="card-body ">
                                <Link to={"/active-vacancies/" + vacancy.id} className="card-title vacancy-link">{vacancy.name}</Link>
                                <p className="card-text ">{vacancy.description.substring(0, 50)}{vacancy.description.length > 50 && '...'}</p>
                            </div>
                        </div>
            })}
        </div>
    )
}

export default ActiveVacancies