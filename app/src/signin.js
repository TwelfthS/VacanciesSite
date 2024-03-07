import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate  } from 'react-router-dom'

import { login } from "./actions/auth"

function SignIn() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const message = useSelector(state => state.message.message)

  const dispatch = useDispatch()

  const onChangename = (e) => {
    const name = e.target.value
    setName(name)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleLogin = (e) => {
    e.preventDefault()

    setLoading(true)

    if (name !== "" && password !== "") {
      dispatch(login(name, password))
        .then(() => {
          navigate("/vacancies")
        })
        .catch(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }

  if (isLoggedIn) {
    return <Navigate to="/vacancies" />
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{minHeight: '50vh'}}>
      <form style={{minWidth: '35vh'}} className="mt-3" onSubmit={handleLogin}>
        <div>
          <div className="form-group mb-3">
            <label htmlFor="name">Логин</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={onChangename}
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
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Войти</span>
            </button>
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

export default SignIn