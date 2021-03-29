import React, { useState, useEffect } from 'react'
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./styles/GlobalStyle";
import { darkTheme } from "./styles/theme";
import Router from "./Router";
import Auth from "./components/Auth";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [token, setToken] = useState('');

 useEffect(() => {
  setToken(localStorage.getItem('token'))
},[])
//  console.log(token)

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <ToastContainer
        autoClose={2500}
        position="top-right"
        closeButton={false}
      />
      {token ? <Router /> : <Auth />}
    </ThemeProvider>
  );
};

export default App;