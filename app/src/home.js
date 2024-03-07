import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function Home() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    if (!isLoggedIn) {
        return <Navigate to="/signin" />
    } else {
        return <Navigate to="/vacancies" />
    }
}

export default Home