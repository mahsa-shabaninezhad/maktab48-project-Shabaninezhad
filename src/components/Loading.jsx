import React from 'react'
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.secondary.main,
  },
}))

const Loading = ({isLoading}) => {
    const classes = useStyles()
    return (
        <Backdrop className={classes.backdrop} open={isLoading} >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loading
