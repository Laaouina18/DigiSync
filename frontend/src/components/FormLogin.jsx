import React from "react";
import email from "../assets/email.png";
export const FormLogin = ({form,handleChange,handleClick}) => {

  return (
    <div className="bg-white w-[439px] h-full">
	<div className=" h-[24px] mt-28 mb-16 ">
	<p className="flex justify-center   mb-5 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">Login into your account</p>
	</div>
	
     <form className="flex flex-col" >
    <div className="flex flex-col m-4">
	<label className="m-2 text-[16.2] font-family:'Poppings-SemiBold',Helvetica]  text-[16.2px]">Email ID:</label>
	 <div className="flex flex-row h-[50px] logindiv w-full rounded-[8.08px]">
	 
	  <input placeholder="email" name="email" onChange={handleChange} value={form.email} className=" p-4 outline-none w-full loginInput"/>
	  <div className="bg-blue-900 rounded-[8.08px] ">
	  <img className="flex justify-center p-3" src={email}/>
	  </div>
	  
	</div>
   
    </div>
	<div className="flex flex-col m-4">
	<label className="m-2 font-family:'Poppings-SemiBold',Helvetica]  text-[16.2px]">Password:</label>
	 <div className="flex flex-row h-[50px]  logindiv w-full rounded-[8.08px] ">
	
	  <input placeholder="password" name="password" type="password" onChange={handleChange} value={form.password} className="p-4 outline-none w-full loginInput"/>
	  <div className="bg-blue-900 rounded-[8.08px]">
	  <img className="flex justify-center rounded-[8.08px] p-3" src={email}/>
	  </div>
	  
	</div>
   
    </div>
 <div className="h-[50px] mt-8 loginbutton">
 <button className="bg-blue-900 p-3 text-white font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px] rounded-[8.08px] w-full" onClick={handleClick}>Login Now</button>
	
 </div>
	 </form>
    </div>
  );
};
export default FormLogin;