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
  },
  datePicker: {
    selectColor: '#DADAD9'
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: { backgroundColor: '#DADAD9' }
    },
    MuiButton: {
      textPrimary: {color: '#36382E'}
    },
    MuiPickersDay: {
      daySelected : {backgroundColor: '#DADAD9'},
      current: {color: '#1976d2'}
    }
  }
}, faIR);

theme.typography.h1 = {
  fontSize: '1.8rem',
  fontWeight: 700,
  
  '@media (max-width:425px)': {
    fontSize: '1.4rem',
  },
  '@media (min-width:700px)': {
    fontSize: '2.2rem',
  },
};
theme.typography.h2 = {
  fontSize: '1.3rem',
  fontWeight: 700,
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
};
theme.typography.h3 = {
  fontSize: '1.2rem',
  fontWeight: 700,
  '@media (min-width:600px)': {
    fontSize: '1.3rem',
  },
};

const Theme = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}

export default Theme
