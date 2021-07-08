import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import '../fonts/fontFace.css'
import { faIR } from '@material-ui/core/locale';

const theme = createMuiTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Yekan, san-serif',
  },
 
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
