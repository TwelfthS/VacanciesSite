import { useState } from 'react'
import { useSelector } from "react-redux"
import { Navigate, useNavigate  } from 'react-router-dom'
import userService from './services/user.service'


function CreateVacancy() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [salary, setSalary] = useState("")
    const currentUser = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const onChangeSalary= (e) => {
        setSalary(e.target.value)
    }
    const handleCreateVacancy = (e) => {
        e.preventDefault()
        if (title !== "") {
            userService.createVacancy(title, description, salary)
            .then((response) => {
                navigate("/active-vacancies/" + response.data.id)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    if (!currentUser) {
        return <Navigate to="/signin" />
    } else if (currentUser.role !== "Employer") {
        return <Navigate to="/vacancies" />
    }
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{minHeight: '50vh'}}>
            <form style={{minWidth: '35vh'}} className="mt-3" onSubmit={handleCreateVacancy}>
                <div>
                    <div className="form-group mb-3">
                        <label htmlFor="title">Title</label>
                        <input
                        type="text"
                        className="form-control"
                        name="title"
                        onChange={onChangeTitle}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="description">Description</label>
                        <textarea
                        className="form-control"
                        name="description"
                        rows="5"
                        onChange={onChangeDescription}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="salary">(optional) Salary</label>
                        <input
                        type="text"
                        className="form-control"
                        name="salary"
                        onChange={onChangeSalary}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <button className="btn btn-primary">Create Vacancy</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateVacancy