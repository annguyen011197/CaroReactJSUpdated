import { combineReducers } from 'redux';
import game from './game/reducer';

const root = combineReducers({ game });
export default root;
