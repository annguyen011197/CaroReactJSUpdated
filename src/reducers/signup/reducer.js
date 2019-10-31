import { signupAction } from '../type'
import _ from 'lodash'
const initAlert: {
    msg: String,
    show: Boolean
} = {
    msg: '',
    show: false,
    type: 'error'
}
const initialState: {
    alert: Object,
    loading: Boolean
} = {
    alert: initAlert,
    loading: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case signupAction.signup:
            return { ...initialState, loading: true }
        case signupAction.success: {
            let alert = {
                msg: "Successful",
                show: true,
                type: 'success'
            }
            return { ...state, loading: false, alert: alert }
        }
        case signupAction.fail: {
            let msg = _.get(payload, "error", "")
            let alert = {
                msg,
                show: true,
                type: 'error'
            }
            return { ...state, loading: false, alert: alert }
        }
        case signupAction.clearErr:
            return { ...state, alert: initialState.alert }
        default:
            return state;
    }
};
