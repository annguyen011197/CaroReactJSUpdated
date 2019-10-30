import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { userActions } from './reducers/type'
import { registerUser } from './reducers/user/saga'


export default function* rootSaga() {
    yield takeLatest(userActions.callLogin, registerUser)
}