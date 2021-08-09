import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Link, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useMediaQuery } from '@material-ui/core';
import { Link as RouterLink, NavLink, useLocation } from "react-router-dom";
import logo from '../../assets/images/bestoreLogo.png'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { BasketContext } from '../../context/BasketContext/BasketContext';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  brand: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  toolbar:{
    padding: theme.spacing(2),
    height: 70,
    overflow: 'hidden',
    transition: 'height .25s',
    '& > *':{
      margin: theme.spacing(0, 2),
      '@media screen and (max-width: 768px)': {
        margin: theme.spacing(0),
         
      },
    },
    '& > :first-child':{
      '@media screen and (max-width: 768px)': {
        margin: theme.spacing(0),
         
      },
    },
  },
  brandName: {
    '@media screen and (max-width: 400px)': {
      fontSize: '1.2rem'       
    }
    
  },
  link:{
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
    color: theme.palette.info.dark
  },
  brandLogo: {
    width: 50,
    objectFit: 'contain',
    marginRight: theme.spacing(1),
    '@media screen and (max-width: 768px)': {
      width: 40,
    }
  },
}));

export default function StoreNavbar({toggleSidebar}) {
  const classes = useStyles();
  const tablet = useMediaQuery('(max-width: 768px)')
  const phone = useMediaQuery('(max-width: 400px)')
  const {pathname} = useLocation()
  const {state} = useContext(BasketContext)

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar className={classes.toolbar}>
          {(tablet && pathname === '/products') && <IconButton edge="start" className={classes.menuButton} aria-label="menu" onClick={toggleSidebar}>
            <MenuIcon color="secondary"/>
          </IconButton>}
          <Link className={classes.brand} color='inherit' component={NavLink} to='/'>
            {!phone && <img className={classes.brandLogo} src={logo}/>}
            {<Typography variant='h1' className={classes.brandName}>
              Bestore
            </Typography>}
          </Link>
          <Link color='inherit' className={classes.link} activeClassName={classes.active} component={NavLink} to='/adminPanel/products'>
            مدیریت
          </Link>
          <IconButton color="secondary" variant='contained' component={RouterLink} to='/cart'>
            <Badge badgeContent={state.numberOfProducts} color='error'>
              <ShoppingCartIcon/>
            </Badge>
          </IconButton>

        </Toolbar>
      </AppBar>
    </div>
  );
}


