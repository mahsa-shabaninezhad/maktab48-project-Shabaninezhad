import React from 'react'
import Navbar from './AdminPanelNavbar';
import PropTypes from 'prop-types'

const AdminPanelLayout = ({children}) => {

    return (
        <div>
            <Navbar/>
            {children}
        </div>
    )
}

AdminPanelLayout.propTypes = {
  children: PropTypes.element
}

export default AdminPanelLayout
