// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import DashboardClient from './pages/DashboardClient';
import NotFound from './pages/NotFound';
import Facture from './components/Facture';
import { Provider } from 'react-redux';
import PrivetRoute from './PrivetRoute';

const App = () => {
	
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route  element={<PrivetRoute />} >
		  <Route path="/dashboard" element={<Dashboard />} />
		  <Route path="/" element={<Dashboard />} />
		  <Route path="/dashboardclient" element={<DashboardClient />} />
          <Route path="/facture" element={<Facture />} />
		  <Route path="/dashboardclient" element={<DashboardClient />} />
          <Route path="/facture" element={<Facture />} />
		  </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </Router>
  );
};

export default App;
