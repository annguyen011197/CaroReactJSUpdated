import axios, { errorHandle } from '../axios'
import { call, delay, put, takeLatest, take } from 'redux-saga/effects'
import moduleName from 'react-router'
import { signupAction } from '../type'
import { success, fail } from './action'
import { push } from 'connected-react-router'

// @flow
function register(username: string, password: string) {
    return axios.post('/user/register', {
        username: username,
        password: password
    })
}

export function* registerUser(action) {
    const { username, password } = action.payload

    try {
        const result = yield call(() => register(username, password))
        yield put(success(result))
        yield delay(1000)
        yield put(push("/signin"))
    } catch (error) {
        yield put(fail(errorHandle(error)))
    }

}