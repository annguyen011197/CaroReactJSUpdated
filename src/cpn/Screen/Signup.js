import React, { Component } from 'react'
import { Container, TextField, withStyles, Checkbox, FormControlLabel, Button, Typography } from '@material-ui/core'
import _ from 'lodash'
import { connect } from 'react-redux';
import { callApi } from '../../reducers/user/action'

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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
});

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            cofirmPass: '',
        }
        this.onChangeUserName = this.onChangeUserName.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
        this.signUp = this.signUp.bind(this)
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
        const { cofirmPass } = this.state
        const value = _.get(e, 'target.value', cofirmPass)
        this.setState({
            cofirmPass: value
        })
    }

    signUp() {
        const { callApi } = this.props
        const { username, password, cofirmPass } = this.state
        // Check
        callApi(username, password)
    }

    render() {
        const { classes } = this.props
        const { username, password, cofirmPass } = this.state
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
                        className={classes.textField}
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
                        className={classes.textField}
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
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        required
                        fullWidth
                        type="password"
                        onChange={this.onChangeConfirmPassword}
                        value={cofirmPass}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.submit}
                        onClick={this.signUp}
                    >
                        Sign up
                    </Button>
                </Container>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    const user = state.user;
    return {
        user: user.user
    };
}

const styledCpn = withStyles(styles)(Signup)

export default connect(
    mapStateToProps,
    {
        callApi
    }
)(styledCpn)
