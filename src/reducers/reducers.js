import { combineReducers } from 'redux';
import game from './game/reducer';
import user from './user/reducer';
import signup from './signup/reducer'
import { connectRouter } from 'connected-react-router'

export default function (hisotry) {
    return combineReducers({
        router: connectRouter(hisotry),
        game,
        user,
        signup
    })
};
