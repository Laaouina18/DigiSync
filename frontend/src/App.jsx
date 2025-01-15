// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';

import NotFound from './pages/NotFound';

import { Provider } from 'react-redux';
import PrivetRoute from './PrivetRoute';
import SyndicProfile from './components/syndicProfile';
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
      <Route path="/profile" element={<SyndicProfile />} />
		  </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </Router>
  );
};

export default App;
