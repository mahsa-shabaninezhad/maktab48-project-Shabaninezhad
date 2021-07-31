import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Sidebar from '../Sidebar'
import { Box } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import StoreNavbar from './StoreNavbar';


const StoreLayout = ({children}) => {
  const [openSidebar, setOpenSidebar] = useState(false)

  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar)
  }
  const {pathname} = useLocation()
  return (
      <Box minHeight='100vh'>
          <StoreNavbar toggleSidebar={handleToggleSidebar}/>
          <Box component='main' display='flex' minHeight={`calc(100vh - 70px)`}>
            { pathname === '/products' && <Sidebar toggleSidebar={openSidebar}/> }
            { children }
          </Box>
          
      </Box>
  )
}

StoreLayout.propTypes = {
  children: PropTypes.element
}

export default StoreLayout
