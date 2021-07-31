import { makeStyles } from '@material-ui/core'
import React from 'react'


const useStyle = makeStyles(theme => ({
    icon:{
        cursor: 'pointer',
        color: props => props.color || theme.palette.secondary.main,
        margin: props => props.margin || theme.spacing(1),
        transition: 'transfom .2s',
        '&:hover':{
            transform: 'scale(1.1)'
        }
    }
}))

const Icon = ({component: Component, ...others}) => {
    const classes = useStyle(others)
    return <Component className={classes.icon} {...others}/>
}

export default Icon
