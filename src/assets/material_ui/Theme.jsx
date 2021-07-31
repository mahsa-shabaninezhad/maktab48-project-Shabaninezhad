import React from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import '../fonts/fontFace.css'
import { faIR } from '@material-ui/core/locale';

let theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Yekan, san-serif',
    fontSize: 16,
    
  },
  palette:{
    primary:{
      light: '#fff',
      main: '#fafafa',
      dark: '#e6e6e6'
    },
    secondary:{
      light: '#36382E',
      main: '#000'
    }
  }
}, faIR);

const Theme = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}

export default Theme
