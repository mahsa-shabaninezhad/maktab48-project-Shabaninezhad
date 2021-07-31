import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    link: {
        color: props => props.color || theme.palette.info.dark,
        textDecoration: 'none',
        '&:hover': {
            transform: 'scale(1.1)',
            borderBottom: `1px solid ${theme.palette.info.dark}`
        }
    }
}))


const RouterLink = ({children,...props}) => {
    const classes = useStyles(props)
    return (
        <Link className={classes.link} {...props}>
            {children}
        </Link>
    )
}


export default RouterLink
