import React from 'react'
import NavBar from '../NavBar';
import PropTypes from 'prop-types'


const navItems = [
  {
    to: '/adminPanel/products',
    isRouterLink: true,
    isButton: false,
    content: 'محصولات',
    props: {}
  },
  {
    to: '/adminPanel/price&inventory',
    isRouterLink: true,
    isButton: false,
    content: 'قیمت و موجودی',
    props: {}
  },
  {
    to: '/adminPanel/orders',
    isRouterLink: true,
    isButton: false,
    content: 'سفارشات',
    props: {}
  },
  {
    to: '/',
    isRouterLink: true,
    isButton: true,
    content: 'بازگشت به سایت',
    props: {}
  },
]

const AdminPanelLayout = ({children}) => {

    return (
        <div>
            <NavBar title="پنل مدیریت فروشگاه" links={navItems}/>
            {children}
        </div>
    )
}

AdminPanelLayout.propTypes = {
  children: PropTypes.element
}

export default AdminPanelLayout
