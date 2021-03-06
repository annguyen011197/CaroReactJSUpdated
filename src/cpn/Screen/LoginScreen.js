import React, { Component } from 'react'
import Login from './Login'
import DefaultScreen from './DefaultScreen'


class LoginScreen extends Component {
    render() {
        const { classes } = this.props
        return (
            <DefaultScreen
                child={<Login />}
            />
        )
    }
}

export default LoginScreen