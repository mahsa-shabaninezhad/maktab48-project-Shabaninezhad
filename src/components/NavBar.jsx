import React from 'react'
import PropTypes from 'prop-types'
import { Typography, AppBar, Toolbar, Button, IconButton, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, NavLink } from "react-router-dom";

/*
links prop format:
links = [
    {
        to: '',
        isRouterLink: true/false,
        isButton: true/false,
        content: '',
    }
]
*/

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar:{
    padding: `${theme.spacing(2.5)}px ${theme.spacing(10)}px`,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    margin: `0 ${theme.spacing(4)}px`,
    padding: theme.spacing(.5),
    borderBottom: '1px solid transparent',
    fontSize: '1rem',
    transition: 'all .2s',

    '&:hover':{
      transform: 'scale(1.1)',
      color: theme.palette.secondary.dark,
      textDecoration: 'none',
      borderBottom: `1px solid ${theme.palette.secondary.dark}`
    }
  },
  active: {
    color: theme.palette.secondary.light

  }
}));

const NavBar = ({brandIcon = null, title, links}) => {
    const classes = useStyles();

    const handleCreatingNavItem = (
      {
        to = '', 
        isRouterLink = true, 
        isButton = false, 
        content
      }, key) => {
        if(isRouterLink){
            return (isButton?
            (<Button 
                variant="contained" 
                color="secondary" 
                key={key} 
                component={RouterLink} 
                to={to}
              >
                {content}
              </Button>)
            :(<Link 
                color='inherit' 
                className={classes.link} 
                key={key} 
                component={NavLink} 
                activeClassName={classes.active} to={to}
              >
                {content}
              </Link>))
        }else{
            return (isButton?
            (<Button 
              variant="contained" 
              color="secondary" 
              key={key}
            >
              {content}
            </Button>)
            :(<Link 
              key={key} 
              className={classes.link}
            >
              {content}
            </Link>))
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar classes={{gutters: classes.toolbar}}>
                  {brandIcon && <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    {brandIcon}
                  </IconButton>}
                  <Typography variant="h4" className={classes.title}>
                    {title}
                  </Typography>
                  {links.map((item, index) => handleCreatingNavItem(item, index))}
                </Toolbar>
            </AppBar>
        </div>
    )
}

NavBar.propTypes = {
  links: PropTypes.array,
  title: PropTypes.string,
  brandIcon: PropTypes.element
}

export default NavBar
