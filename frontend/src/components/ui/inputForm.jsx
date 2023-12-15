import React from "react";

const InputForm=({label,placeholder, image})=>{
	return (
		<div className="relative w-[429px] h-[85px]">
		<label className="absolute top-0 left-0 [font-family:'Poppins-Regular',Helvetica]">{label}</label>
       <div className="fixed w-[433px] h-[50px] top-[34px] left-0 bg-[#eeeeee] rounded-[8.08px]">
	   <img className="absolute w-[50px] h-[50px] top-0 left-[379px] " src={image}/>
	   <input className="absolute top-0 left-0 [font-family:'Poppins-Regular',Helvetica]" placeholder={placeholder}/>
	   </div>
		 
			
		</div>
	)
}
export default InputForm;