import React, { Component } from 'react'
import { Container, TextField, withStyles, Checkbox, FormControlLabel, Button, Typography } from '@material-ui/core'
import { connect } from 'react-redux';
import { callApi } from '../../reducers/user/action'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {

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

class Login extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props
        return (
            <Container
                maxWidth="xs"
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <TextField
                        id="username"
                        label="User name "
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        required
                        fullWidth
                    />
                    <TextField
                        id="password"
                        label="Password"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        required
                        fullWidth
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
                            // this.props.callApi('annguyen011197', '011197')
                        }}
                    >
                        Sign In
                    </Button>
                </form>
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

const styledCpn = withStyles(styles)(Login)

export default connect(
    mapStateToProps,
    {
        callApi
    }
)(styledCpn)
