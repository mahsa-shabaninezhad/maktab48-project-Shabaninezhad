import React from 'react'
import { makeStyles, Paper, Collapse, List, ListItem, ListItemText } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import useQuery from '../hooks/useQuery';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';


const useStyles = makeStyles(theme => ({
  root: {
    width: 250,
    height: `calc(100vh - 70px)`,
    transition: 'transform 1s',
    '@media (max-width: 768px)': {
      position: 'absolute',
      zIndex: '1500',
      transform: 'translateX(-100%)'
    }
  },
  sidebarOpen: {
    transform: 'translateX(0)'
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    color: theme.palette.secondary.light,
    paddingLeft: theme.spacing(4),
  },
  active: {
    color: theme.palette.info.dark
  },
  icon: {
    marginRight: theme.spacing(1)
  }

}))

const products = [
  {
    category: 'گوشی موبایل',
    brands: [  
      'اپل',
      'سامسونگ',
      'شیائومی',
    ]
  },
  {
    category: 'لپ تاپ',
    brands: [  
      'اپل',
      'مایکروسافت',
      'ایسوس',
    ]
  },
  {
    category: 'دوربین',
    brands: [  
      'نیکون',
      'کانن',
      'فوجی فیلم',
    ]
  }
]

const Sidebar = ({toggleSidebar}) => {
    const classes = useStyles()
    const query = useQuery()
    const [open, setOpen] = React.useState(query.get('category'));

    const handleClick = (category) => {
        setOpen(category);
    };
    return (
      <>
        <Paper className={clsx(classes.root, {[classes.sidebarOpen]: toggleSidebar})}  square variant="outlined">
            <List
              component="nav"
              aria-labelledby="محصولات"
              className={classes.list}
            >
              {
                products.map(product => <>
                  <ListItem button onClick={() => handleClick(product.category)}>
                    {
                      product.category === 'لپ تاپ'?
                      <LaptopMacIcon className={classes.icon}/> 
                      :product.category === 'دوربین'
                      ?<CameraAltIcon className={classes.icon}/>
                      :<PhoneIphoneIcon className={classes.icon}/>
                    }
                    <ListItemText primary={product.category} />
                    {open === product.category ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open === product.category} timeout="auto" unmountOnExit>
                    {
                      product.brands.map(brand => (<List key={brand} component="div" disablePadding>
                          <ListItem 
                            component={RouterLink} 
                            to={`/products?category=${open}&brand=${brand}&_page=1&_limit=5`} 
                            className={clsx(classes.nested, {
                              [classes.active]:  brand === query.get('brand')
                            })}
                          >
                            <ListItemText primary={brand} />
                          </ListItem>
                        </List>))
                    }
                  </Collapse>
                </>
              )}
            </List>
        </Paper>
      </>
    )
}

export default Sidebar
