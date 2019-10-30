import React, { Component } from 'react'
import { Grid, Paper, CssBaseline, withStyles } from '@material-ui/core'

const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${require('../../assets/caro.jpg')})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    form: {
        minHeight: '100vh'
    }
});

class DefaultScreen extends Component {
    render() {
        const { classes, child } = this.props
        return (
            <Grid
                container
                xs={12}
                className={classes.root}
            >

                <Grid
                    item
                    xs={false} sm={4} md={7}
                    className={classes.image}
                >
                </Grid>
                <Grid item
                    xs={12} sm={8} md={5}
                    component={Paper} elevation={6} square
                >
                    <Grid container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        className={classes.form}
                    >
                        {child}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(DefaultScreen)