import axios from "axios"

const API_URL = "http://localhost:8000/"

class AuthService {
  async login(name, password) {
    const response = await axios.post(API_URL + "signin", { name, password })
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data
  }

  logout() {
    localStorage.removeItem("user")
  }

  async register(name, password, role) {
    const response = await axios.post(API_URL + "signup", {
      name,
      password,
      role
    })
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data
  }
}

const authService = new AuthService()

export default authService