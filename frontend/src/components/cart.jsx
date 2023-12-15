import React from "react";
import outline from "../assets/img/outline.png";
import defaultt from "../assets/img/defaultt.png";
import cartt from "../assets/img/cart.png"
const cart=({numAPP})=>{
  return(
	<div className="w-full  m-2 p-4  flex flex-row justify-between p-2">
		<div className="flex flex-row justify-between w-3/12 p-2 bg-white rounded-[8.08px] h-[60px]">
			<div className="flex flex-col justify-between">
				<div className="font-family:'Poppings-SemiBold',Helvetica] text-gray-300 font-semibold text-[16.2px]">
					Appartement
				</div>
				<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">
					{numAPP}
				</div>
				
			</div>
			<div className="bg-blue-400 rounded-[8.08px]">
				<img className=" flex justify-center p-2" src={defaultt} />
					</div>
		</div>
		<div className="flex flex-row justify-between w-3/12 p-2 bg-white rounded-[8.08px] h-[60px]">
			<div className="flex flex-col justify-between">
				<div className="font-family:'Poppings-SemiBold',Helvetica] text-gray-300 font-semibold text-[16.2px]">
					Utlisateurs
				</div>
				<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">
					2
				</div>
				
			</div>
			<div className="bg-blue-400 rounded-[8.08px]">
				<img className=" flex justify-center p-2" src={outline} />
					</div>
		</div>
		<div className="flex flex-row justify-between w-3/12 p-2 bg-white rounded-[8.08px] h-[60px]">
			<div className="flex flex-col justify-between">
				<div className="font-family:'Poppings-SemiBold',Helvetica] text-gray-300 font-semibold text-[16.2px]">
					total argent
				</div>
				<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">
					2
				</div>
				
			</div>
			<div className="bg-blue-400 rounded-[8.08px]">
				<img className=" flex justify-center p-2" src={cartt} />
					</div>
		</div>
	</div>
  )

}
export default cart;