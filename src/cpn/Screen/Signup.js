import React, { Component } from 'react'
import { Container, TextField, withStyles, Checkbox, FormControlLabel, Button, Typography, Link, preventDefault } from '@material-ui/core'
import _ from 'lodash'
import { link } from '../../reducers/axios'
import { withAlert } from "react-alert";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { signup, clearErr } from '../../reducers/signup/action'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        borderColor: 'red'
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    link: {
        marginTop: theme.spacing(2),
    }
});

type State = {
    username: String,
    password: String,
    confirmPass: String,
};

class Signup extends Component<{}, State> {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            confirmPass: '',
        }
        this.onChangeUserName = this.onChangeUserName.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
        this.signUp = this.signUp.bind(this)
    }

    componentDidUpdate() {
        const { signupAlert, loading, alert, clearErr } = this.props;
        if (signupAlert.show) {
            alert.show(signupAlert.msg, {
                type: signupAlert.type
            })
            clearErr()
        }
    }

    // @flow
    onChangeUserName(e: Object) {
        const { username } = this.state
        const value = _.get(e, 'target.value', username)
        this.setState({
            username: value
        })
    }

    // @flow
    onChangePassword(e: Object) {
        const { password } = this.state
        const value = _.get(e, 'target.value', password)
        this.setState({
            password: value
        })
    }

    onChangeConfirmPassword(e: Object) {
        const { confirmPass } = this.state
        const value = _.get(e, 'target.value', confirmPass)
        this.setState({
            confirmPass: value
        })
    }

    signUp() {
        const { signup, alert } = this.props
        const { username, password, confirmPass } = this.state
        if (username.trim().length === 0) {
            alert.show("Username is empty");
            return;
        }
        if (password.length === 0) {
            alert.show("Password is empty");
            return;
        }
        if (password.includes(" ")) {
            alert.show("Password contains space character");
            return;
        }
        if (confirmPass !== password) {
            alert.show("Confirm password is not match")
        }
        signup(username, password)
    }

    render() {
        const { classes, loading } = this.props
        const { username, password, confirmPass } = this.state
        return (
            <Container
                maxWidth="xs"
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Container className={classes.form}>
                    <TextField
                        id="username"
                        label="User name "
                        margin="normal"
                        variant="outlined"
                        required
                        fullWidth
                        onChange={this.onChangeUserName}
                        value={username}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        margin="normal"
                        variant="outlined"
                        required
                        fullWidth
                        type="password"
                        onChange={this.onChangePassword}
                        value={password}
                    />
                    <TextField
                        id="password"
                        label="Retype Password"
                        margin="normal"
                        variant="outlined"
                        required
                        fullWidth
                        type="password"
                        onChange={this.onChangeConfirmPassword}
                        value={confirmPass}
                        error={confirmPass !== password}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.submit}
                        onClick={this.signUp}
                        disabled={loading}
                    >
                        Sign up
                    </Button>
                    <Typography variant="subtitle1" gutterBottom className={classes.link}>
                        If you have an account, Please <Link href="/signin">Sign in</Link>
                    </Typography>
                </Container>
            </Container >
        )
    }
}

function mapStateToProps(state) {
    const signup = state.signup;
    return {
        signupAlert: signup.alert,
        loading: signup.loading
    };
}

export default compose(
    withRouter,
    withAlert(),
    withStyles(styles),
    connect(mapStateToProps, {
        signup, clearErr
    })
)(Signup)
