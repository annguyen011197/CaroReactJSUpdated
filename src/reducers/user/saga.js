import axios, { errorHandle } from '../axios'
import { call, delay, put, takeLatest, take } from 'redux-saga/effects'
import { userActions } from '../type'
import { loginSuccessfull, loginFail } from './action'

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
        yield put(loginSuccessfull(result))
    } catch (error) {
        yield put(loginFail(errorHandle(error)))
    }

}