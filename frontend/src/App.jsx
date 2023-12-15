
import './App.css';
import React from 'react';
import  Dashboard from "./pages/Dashboard";
import Login from "./pages/Login"
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {

  return (
    <>
	<Provider store={store}>
		<Login/>
	</Provider>


    </>
  )
}

export default App;