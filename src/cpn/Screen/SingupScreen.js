import React, { Component } from 'react'
import Signup from './Signup'
import DefaultScreen from './DefaultScreen'

class SignupScreen extends Component {
    render() {
        const { classes } = this.props
        return (
            <DefaultScreen
                child={<Signup />}
            />
        )
    }
}

export default SignupScreen
