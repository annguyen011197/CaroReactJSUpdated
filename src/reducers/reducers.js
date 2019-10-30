import { combineReducers } from 'redux';
import game from './game/reducer';
import user from './user/reducer';

const root = combineReducers({ game, user });
export default root;
