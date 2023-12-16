import React, { useState } from "react";
import Formsgnin from "../components/FormSignin";
import { useDispatch } from "react-redux";
import {  SigninSyndic } from "../redux/actions/AuthActions";
import signin from "../assets/img/signin.png";

const Signin = () => {
	const dispatch = useDispatch();
	const [Form, setForm] = useState(
		{
			firstName: "",
			lastName: "",
			email: "",
			immeuble:"",
			phone: "",
			password: "",
			repeatpass: ""
		}
	);
	const handleChange = (e) => {
		const { value, name } = e.target;
		setForm((x) =>
		({
			...x, [name]: value
		}));

	}
	const handleClick = () => {
		const {firstName,lastName,email,phone,password,immeuble}=Form;
		dispatch(SigninSyndic({firstName,lastName,email,phone,password,immeuble}));
	}
	return (
		<div className="grid xl:grid-cols-[60%_40%] lg:grid-cols-[60%_40%]  w-full h-screen">

			<div className="mt-24 flex justify-center">
				<Formsgnin FormData={Form} handleChange={handleChange} handleClick={handleClick} />
			</div>
			<img src={signin} className="w-full" />
		</div>
	)
}
export default Signin;