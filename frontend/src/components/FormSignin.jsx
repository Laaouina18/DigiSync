import React from "react";
import {useNavigate} from "react-router-dom";
const Formsgnin = ({handleChange,handleClick,FormData}) => {
 const navigate=useNavigate();
	return (
		<div>
			<form>
				<div className=" flex flex-row">

					<div className="flex flex-col m-2">
						<label className="">FirstName:</label>
						<div className="flex flex-row h-[50px] logindiv w-full rounded-[8.08px]">

							<input required  placeholder="enter your name" name="firstName" value={FormData.firstName} onChange={handleChange} className=" p-4 outline-none w-full loginInput" />
							<div className="bg-blue-900 rounded-[8.08px] ">

							</div>

						</div>

					</div>
					<div className="flex flex-col m-2">
						<label>LastName:</label>
						<div className="flex flex-row h-[50px]  logindiv w-full rounded-[8.08px] ">

							<input required  placeholder="enter your name" value={FormData.lastName} name="lastName" onChange={handleChange} className="p-4 outline-none w-full loginInput" />
							<div className="bg-blue-900 rounded-[8.08px]">

							</div>

						</div>

					</div>
				</div>
				<div className="flex">

					<div className="flex flex-col m-2">
						<label className="">Email:</label>
						<div className="flex flex-row h-[50px] logindiv w-full rounded-[8.08px]">

							<input required  placeholder="enter your email" name="email" value={FormData.email} onChange={handleChange} className=" p-4 outline-none w-full loginInput" />
							<div className="bg-blue-900 rounded-[8.08px] ">

							</div>

						</div>

					</div>
					<div className="flex flex-col m-2">
						<label>Mobile:</label>
						<div className="flex flex-row h-[50px]  logindiv w-full rounded-[8.08px] ">

							<input required  placeholder="enter your numberphone" name="phone" value={FormData.phone} onChange={handleChange} className="p-4 outline-none w-full loginInput" />
							<div className="bg-blue-900 rounded-[8.08px]">

							</div>

						</div>

					</div>
				</div>
				<div className="flex">

					<div className="flex flex-col m-2">
						<label className="">Password:</label>
						<div className="flex flex-row h-[50px] logindiv w-full rounded-[8.08px]">

							<input required  placeholder="xxxxxx" value={FormData.password} name="password" onChange={handleChange} type="password" className=" p-4 outline-none w-full loginInput" />
							<div className="bg-blue-900 rounded-[8.08px] ">

							</div>

						</div>

					</div>
					<div className="flex flex-col m-2">
						<label>Confirm Password:</label>
						<div className="flex flex-row h-[50px]  logindiv w-full rounded-[8.08px] ">

							<input required  placeholder="xxxxxx" type="password" value={FormData.repeatpass} name="repeatpass" onChange={handleChange} className="p-4 outline-none w-full loginInput" />
							<div className="bg-blue-900 rounded-[8.08px]">

							</div>

						</div>

					</div>
				</div>
				<div className="flex flex-col m-2">
					<label>Immeuble:</label>
					<div className="flex flex-row h-[50px]  logindiv w-3/6 rounded-[8.08px] ">

						<input required  placeholder="immeuble" name="immeuble" value={FormData.immeuble} onChange={handleChange} className="p-4 outline-none w-full loginInput" />
						<div className="bg-blue-900 rounded-[8.08px]">

						</div>

					</div>

				</div>
				<div className="h-[50px] mt-8 ml-1">
					<button className="bg-blue-900 p-3 w-2/6 text-white font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px] rounded-[8.08px] " onClick={handleClick}>
						Sign up
					</button>
				</div>
				
				<div>Vous avez déja un compte ? <button className="text-blue-600" onClick={()=>navigate("/login")}>Login</button></div>
			</form>

		</div>
	)
}
export default Formsgnin;