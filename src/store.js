import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history'
import reducer from './reducers/reducers';
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import rootSaga from './saga'
const sagaMiddleware = createSagaMiddleware()
const history = createBrowserHistory()
const connectRouterMiddeware = routerMiddleware(history)
const store = createStore(reducer(history), applyMiddleware(sagaMiddleware, connectRouterMiddeware));
sagaMiddleware.run(rootSaga)
export { history }
export default store;