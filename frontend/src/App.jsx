// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  store  from './redux/store';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import DashboardClient from './pages/DashboardClient';
import NotFound from './pages/NotFound';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Router>
    
	  <Provider store={store}>
	  <Routes>
	  <Route path="/" element={<DashboardClient />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboardclient" element={<DashboardClient />} />
        <Route path="*" element={<NotFound />} />
		</Routes>
	  </Provider>
	
    </Router>
  );
};

export default App;
