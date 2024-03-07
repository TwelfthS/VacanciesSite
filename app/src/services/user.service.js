import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8000/'

class UserService {
  createVacancy(title, description, salary) {
    return axios.post(API_URL + "vacancies", {
      title,
      description,
      salary
    }, { headers: authHeader() })
  }

  getVacancies() {
    return axios.get(API_URL + "vacancies", { headers: authHeader() })
  }

  getVacancy(vacancyId) {
    return axios.get(API_URL + "vacancies/" + vacancyId, { headers: authHeader() })
  }

  getMyVacancies() {
    return axios.get(API_URL + "my-vacancies", { headers: authHeader() })
  }

  subToVacancy(vacancyId, action) {
    return axios.put(API_URL + "vacancies", {
      vacancyId,
      action
    }, { headers: authHeader() })
  }

  closeVacancy(vacancyId) {
    return axios.delete(API_URL + "vacancies", { headers: authHeader(), data: { vacancyId } })
  }
}

const userService = new UserService()

export default userService