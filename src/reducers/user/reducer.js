import { userActions } from '../type'

const initialState = {
    user: ""
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case userActions.loginSuccess:
            console.log(payload.result)
            return state;
        case userActions.loginFail:
            console.log(payload.error)
            return state;
        default:
            return state;
    }
};
