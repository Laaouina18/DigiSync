import React, { useState } from "react";
import Formsgnin from "../components/FormSignin";
import { useDispatch ,useSelector} from "react-redux";
import {  SigninSyndic } from "../redux/actions/AuthActions";
import signin from "../assets/img/signin.png";
import { useNavigate } from "react-router-dom";
const Signin = () => {
	const navigate=useNavigate();
	const message=useSelector((state)=>state.AuthReducer.error);
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
		const fieldsWithErrors = Object.keys(Form).filter((field) => Form[field].trim() === "");
		if (Form.password !== Form.repeatpass) {
			alert("Password and Repeat Password do not match");
			return;
		  }
		if (fieldsWithErrors.length > 0) {
		  alert(`Please fill in all fields: ${fieldsWithErrors.join(", ")}`);
		  return;
		}
		const {firstName,lastName,email,phone,password,immeuble}=Form;
		dispatch(SigninSyndic({firstName,lastName,email,phone,password,immeuble}));
		const message=localStorage.getItem('message');
		if(message){
			alert(message);
			return;
		}
		navigate('/login');
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