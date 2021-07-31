import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { adminLogOut } from '../../store/actions/adminActions';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Link, IconButton, Box} from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';
import logo from '../../assets/images/bestoreLogo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    '@media screen and (max-width: 450px)': {
      display: 'none'
    },
  },
  toolbar:{
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: theme.spacing(0,2),
    height: 70,
    overflow: 'hidden',
    transition: 'height .25s',
    
  },
  toolbarOpen:{
    height:220
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    '@media screen and (max-width: 850px)': {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  },
  link:{
    borderBottom: '1px solid transparent',
    fontSize: '1rem',
    transition: 'all .2s',
    margin: `0 ${theme.spacing(4)}px`,

    '&:hover':{
      transform: 'scale(1.1)',
      color: theme.palette.secondary.dark,
      textDecoration: 'none',
      borderBottom: `1px solid ${theme.palette.secondary.dark}`
    },

    '@media screen and (max-width: 1024px)': {
        margin: theme.spacing(0, 2),
       
    },
    '@media screen and (max-width: 850px)': {
        margin: theme.spacing(0, 2, 1),
       
    },
  },
  active: {
    color: theme.palette.info.dark
  },
  logo: {
    width: 50,
    objectFit: 'contain'
  }
}));

const AdminPanelNavbar = () =>  {
  const classes = useStyles();
  const tablet = useMediaQuery('(max-width: 850px)')
  const [openMenu, setOpenMenu] = useState(false)
  const dispatch = useDispatch()

  const handleToggleMenu = () => {
      setOpenMenu(!openMenu)
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar className={clsx(classes.toolbar,{[classes.toolbarOpen]: openMenu})}>
          <IconButton color="secondary" variant='contained' component={RouterLink} to='/'>
            <img className={classes.logo} src={logo} alt="Logo" />
          </IconButton>
          <Typography variant='h1' className={classes.title}>
            پنل مدیریت فروشگاه
          </Typography>
          {tablet && <IconButton edge="start" aria-label="menu" onClick={handleToggleMenu}>
            <MenuIcon color="secondary"/>
          </IconButton>}
          <Box className={classes.links}>
            <Link color='inherit' onClick={() => setOpenMenu(false)}  className={classes.link} activeClassName={classes.active} component={NavLink} to='/adminPanel/products'>
              محصولات
            </Link>
            <Link color='inherit' onClick={() => setOpenMenu(false)}  className={classes.link} activeClassName={classes.active} component={NavLink} to='/adminPanel/price&inventory'>
              قیمت و موجودی
            </Link>
            <Link color='inherit' onClick={() => setOpenMenu(false)}  className={classes.link} activeClassName={classes.active} component={NavLink} to='/adminPanel/orders'>
              سفارشات
            </Link>
            <IconButton color="secondary" variant='contained' onClick={() => dispatch(adminLogOut())}>
              <ExitToAppIcon color='secondary'/>
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>
    </div>
  )
}


export default AdminPanelNavbar