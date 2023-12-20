import React from "react";
import { Route , Navigate ,Outlet} from "react-router-dom";
const PrivateRoute = () => {
	const isAuthenticated = localStorage.getItem('user');

	return isAuthenticated ? (
		<Outlet/>):(<Navigate to="/login"></Navigate>
	) 
};
export default PrivateRoute;