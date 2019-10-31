import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { signupAction } from './reducers/type'
import { registerUser } from './reducers/signup/saga'


export default function* rootSaga() {
    yield takeLatest(signupAction.signup, registerUser)
}