import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    
    form: {
        display: 'flex',
        padding: props => props.padding || '',
        flexDirection: 'column',
        justifyContent: props => props.justifyContent || 'center',
        alignItems: 'center',
        width: props => props.width || '100%',
        height: props => props.height || 'min-content',
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
            width: '2px',
        },
        "&::-webkit-scrollbar-thumb": {
            background: theme.palette.secondary.main
        },
        '& > *': {
          margin: theme.spacing(1.5),
          minWidth: '50%',
        },
    },

}));


const Form = ({children, header = null, onSubmit, ...props}) => {
    const classes = useStyles(props)

    return (
        <form className={classes.form} onSubmit={onSubmit} noValidate autoComplete="off">
            {children}
        </form>
    )
}

export default Form
