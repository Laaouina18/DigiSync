import React, { useState } from "react";
import FormLogin from "../components/FormLogin";
import { useDispatch } from "react-redux";
import { LoginSyndic } from "../redux/actions/AuthActions";
import Backgroundlogin from "../assets/img/Backgroundlogin.png";
const Login = () => {
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
		e.preventDefault();
		dispatch(LoginSyndic(Form));
	}
	return (
		<div className="grid xl:grid-cols-[60%_40%] lg:grid-cols-[60%_40%]  w-full h-full">
			<img className="w-12/12" src={Backgroundlogin} />
			<div className="flex justify-center m-2">
				<FormLogin handleChange={handleChange} handleClick={handleClick} form={Form}/>
			</div>

		</div>
	)

}

export default Login;