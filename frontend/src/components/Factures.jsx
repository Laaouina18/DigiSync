import React from "react";
import pdf from "../assets/img/text.png";
const Facture=()=>{

	return(
		<div className="bg-white rounded-[8.08px] flex flex-col w-2/6 p-2 mb-2">
         <div className="flex flex-row justify-between p-4">
			<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">
				Details
			</div>
			<button className=" border border-blue-500 px-4 py-1 text-blue-500 rounded-[8.08px]">VIEW ALL</button>
		 </div>
         <div className="flex flex-row justify-between p-4">
			<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">March,01,2020</div>
			
			<div className="flex flex-row justify-between">
             <div className="font-family:'Poppings-SemiBold',Helvetica] text-gray-300 font-semibold text-[16.2px]">
				1000dh
			 </div>
			 <div className="flex flex-row justify-between">
			 <img className="flex justify-center h-[22px]" src={pdf}/>
			
				<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">Pdf</div>
				
				
			 </div>
			</div>
		 </div>
		 <div className="flex flex-row justify-between p-4">
			<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">March,01,2020</div>
		
			<div className="flex flex-row justify-between">
             <div className="font-family:'Poppings-SemiBold',Helvetica] text-gray-300 font-semibold text-[16.2px]">
				1000dh
			 </div>
			 <div className="flex flex-row justify-between">
			 <img className="flex justify-center h-[22px]" src={pdf}/>
			
				<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">Pdf</div>
				
				
			 </div>
			</div>
		 </div>
		 <div className="flex flex-row justify-between p-4">
			<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">March,01,2020</div>
			
			<div className="flex flex-row justify-between">
             <div className="font-family:'Poppings-SemiBold',Helvetica] text-gray-300 font-semibold text-[16.2px]">
				1000dh
			 </div>
			 <div className="flex flex-row justify-between">
			 <img className="flex justify-center h-[22px]" src={pdf}/>
			
				<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">Pdf</div>
				
				
			 </div>
			</div>
		 </div>
		 <div className="flex flex-row justify-between p-4">
			<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">March,01,2020</div>
			<div className="flex flex-row justify-between">
             <div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px] text-gray-300">
				1000dh
			 </div>
			 <div className="flex flex-row justify-between">
			 <img className="flex justify-center h-[22px]" src={pdf}/>
			
				<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">Pdf</div>
				
				
			 </div>
			</div>
		 </div>
		</div>
	)
}

export default Facture;