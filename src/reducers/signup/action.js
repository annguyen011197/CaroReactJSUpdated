import { signupAction } from '../type'

export function signup(username: String, password: String) {
    return {
        type: signupAction.signup,
        payload: {
            username,
            password
        }
    }
}

export function success(result) {
    return {
        type: signupAction.success,
        payload: {
            result
        }
    }
}

export function fail(error) {
    return {
        type: signupAction.fail,
        payload: {
            error
        }
    }
}

export function clearErr() {
    return {
        type: signupAction.clearErr
    }
}