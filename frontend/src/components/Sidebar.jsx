import React from "react";

import logo from "../assets/img/Logo.png";
import defaultt from "../assets/img/default.png";
import chart from "../assets/img/chart.png";
import person from "../assets/img/person.png";
import document from "../assets/img/document.png";
const Sidebar = () => {
	return (
		<div className=" h-full ">
			<div className="flex flex-col justify-between">
				<div className="p-4">
					<img className="p-5 w-[200px]" src={logo} />
				</div>

				<div className="m-4 flex flex-row  bg-white rounded-[8.08px] w-[255px] h-[32px]">
					<div className="bg-blue-500 rounded-[8.08px]">

						<img className="w-full h-full flex justify-center p-2" src={defaultt} />
					</div>

					<div className=" font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px] ml-4 flex justify-center">Dashboard</div>
				</div>
				<div className="m-4 flex flex-row   rounded-[15px] w-[255px] h-[32px]">
					<div className="bg-white rounded-[8.08px]">

						<img className="w-full h-full flex justify-center p-2" src={chart} />
					</div>

					<div className=" text-[16.2px] font-family:'Poppings-SemiBold',Helvetica] text-gray-400  text-[16.2px] w-[63px] ml-4">Appartements</div>
				</div>
			</div>

			<div>
				<h1 className=" font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px] ml-4 mt-8">ACCOUNT PAGES</h1>
				<div className="flex flex-col">

				<div className="m-4 flex flex-row   rounded-[15px] w-[255px] h-[32px]">
					<div className="bg-white rounded-[8.08px]">

						<img className="w-full h-full flex justify-center p-2" src={person} />
					</div>

					<div className="font-family:'Poppings-SemiBold',Helvetica] text-gray-400  text-[16.2px] w-[63px] ml-4">Profile</div>
				</div>
				
				<div className="m-4 flex flex-row   rounded-[15px] w-[255px] h-[32px]">
					<div className="bg-white rounded-[8.08px]">

						<img className="w-full h-full flex justify-center p-2" src={document} />
					</div>

					<div className=" font-family:'Poppings-SemiBold',Helvetica] text-gray-400 text-[16.2px] ml-4">Sign In</div>
				</div>
				</div>
			</div>
		</div>
	)

}

export default Sidebar;