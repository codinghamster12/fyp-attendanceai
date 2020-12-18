import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Provider } from 'react-redux'
import store from './store';

window.store= store;



const theme= createMuiTheme({
  palette:{
    primary: {
      main: '#116535'
    },
    secondary:{
      main: '#fff'
    }
    
},

})






ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>

  </Provider>,
    document.getElementById('root')

  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
