import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate, Link  } from 'react-router-dom'

import { register } from "./actions/auth"

function SignUp({ role }) {
    const navigate = useNavigate()
  
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  
    const message = useSelector(state => state.message.message)
    const dispatch = useDispatch()
  
    const onChangeName = (e) => {
      setName(e.target.value)
    }
  
    const onChangePassword = (e) => {
      setPassword(e.target.value)
    }

    const onChangeRepeatPassword = (e) => {
      setRepeatPassword(e.target.value)
    }
  
    const handleRegister = (e) => {
      e.preventDefault()

      if (password !== repeatPassword) {
        dispatch({type: 'SET_MESSAGE', payload: "Пароли не совпадают!"})
      } else if (name !== "" && password !== "") {
        dispatch(register(name, password, role))
          .then(() => {
            navigate("/vacancies")
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
    if (isLoggedIn) {
      return <Navigate to="/vacancies" />
    }
  
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{minHeight: '50vh'}}>
        <form style={{width: '47vh'}} className="mt-3" onSubmit={handleRegister}>
          <div>
            <div className="form-group mb-3 d-flex justify-content-center">
              <Link className="vacancy-link" style={{fontSize: '15px'}} to={role === "Employer" ? '/signup' : '/company-signup'}>Нажмите сюда, чтобы зарегистрироваться как {role === "Employer" ? 'соискатель' : 'рекрутер'}</Link>
            </div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="name">Логин {role === "Employer" ? '(Название компании)' : '(Имя пользователя)'}</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={onChangeName}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={onChangePassword}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="repeat-password">Повторите пароль</label>
              <input
                type="password"
                className="form-control"
                name="repeat-password"
                onChange={onChangeRepeatPassword}
              />
            </div>

            <div className="form-group mb-3">
              <button className="btn btn-primary btn-block">Зарегистрироваться</button>
            </div>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    )
  }
  
  export default SignUp