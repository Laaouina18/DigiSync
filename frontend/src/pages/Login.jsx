import React, { useState } from "react";
import FormLogin from "../components/FormLogin";
import { useDispatch, useSelector } from "react-redux";
import { LoginSyndic } from "../redux/actions/AuthActions";
import Backgroundlogin from "../assets/img/Backgroundlogin.png";
import { useNavigate } from "react-router-dom"
const Login = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const [Form, setForm] = useState({
		email: "",
		password: ""
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prv) => ({
			...prv, [name]: value
		}));

	}
	const handleClick = (e) => {
		try{
		e.preventDefault();

		dispatch(LoginSyndic(Form));
		if(localStorage.getItem("user")){
			navigate('/dashboard');
		}
		}catch(error){
			console.log(error)
		}
			
		
	}
	return (
	
				<FormLogin handleChange={handleChange} handleClick={handleClick} form={Form} />
		

	
	)

}

export default Login;