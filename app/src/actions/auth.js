import AuthService from "../services/auth.service"

export const register = (username, password, role) => async (dispatch) => {
    try {
        const data = await AuthService.register(username, password, role)
        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: { user: data }
        })

        dispatch({
            type: 'SET_MESSAGE',
            payload: data.message,
        })
        return await Promise.resolve()
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()

        dispatch({
            type: 'REGISTER_FAIL',
        })

        dispatch({
            type: 'SET_MESSAGE',
            payload: message,
        })
        return await Promise.reject()
    }
}

export const login = (username, password) => async (dispatch) => {
    try {
        const data = await AuthService.login(username, password)
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user: data },
        })
        return await Promise.resolve()
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()

        dispatch({
            type: 'LOGIN_FAIL',
        })

        dispatch({
            type: 'SET_MESSAGE',
            payload: message,
        })
        return await Promise.reject()
    }
}

export const logout = () => (dispatch) => {
    AuthService.logout()

    dispatch({
        type: 'LOGOUT',
    })
}