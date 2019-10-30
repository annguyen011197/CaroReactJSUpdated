import { userActions } from '../type'

export function callApi(username: String, password: String) {
    return {
        type: userActions.callLogin,
        payload: {
            username,
            password
        }
    }
}

export function loginSuccessfull(result) {
    return {
        type: userActions.loginSuccess,
        payload: {
            result
        }
    }
}

export function loginFail(error) {
    return {
        type: userActions.loginFail,
        payload: {
            error
        }
    }
}