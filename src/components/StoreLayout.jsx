import React from 'react'
import NavBar from './NavBar';
import PropTypes from 'prop-types'

const navItems = [
  {
    to: '/adminPanel/products',
    isRouterLink: true,
    isButton: false,
    content: 'مدیریت',
    props: {}
  },
  {
    to: '/card',
    isRouterLink: true,
    isButton: true,
    content: 'سبد خرید',
    props: {}
  },
]

const StoreLayout = ({children}) => {

    return (
        <div>
            <NavBar title="فروشگاه" links={navItems}/>
            {children}
            
        </div>
    )
}

StoreLayout.propTypes = {
  children: PropTypes.element
}

export default StoreLayout
