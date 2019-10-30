import axios from 'axios';
import _ from 'lodash'
const debug = 'http://localhost:8080'
const release = 'https://demo-main-menu.herokuapp.com/'
const instance = axios.create({
    baseURL: debug,
})
// @flow
export function errorHandle(error: {}): String {
    if (error.response) {
        return _.get(error.response.data, "message", "")
    }
    return `Error: ${error.message}`
}

export default instance