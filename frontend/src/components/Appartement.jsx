import React, { useState } from "react";
import circle from "../assets/img/circle.png";
import Icon from "../assets/img/Icon.png";
import home from "../assets/img/home.png";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const Appartement = ({handlClick,supprimer,update,ajouter,show}) => {
	
	const Apps = useSelector((state) => state.AppReducer.APPs);
	return (
		<div className="w-full h-full bg-white border rounded-[8.08px] m-2">
		<div className="flex justify-end p-4" >
		{ajouter?(<button className="text-green-500" onClick={() => handlClick()}>Ajouter Appartement</button>):("")}
			<img src={Icon} onClick={show}/>
			
		</div>
		   <div className="flex flex-row justify-between w-[100px] p-4" >
			<img src={circle}   />
			<h4 className=" text-l px-6 text-black-100">Apparts</h4>
		   </div>
	         <div className="p-4">
				
			 <table className="w-full relative  mb-6 ">
					<thead>
						<tr className=" w-full ">
							<th className="text-sm px-6 py-3 text-gray-300 text-start ">Apartments</th>
							<th className="text-sm px-6 py-3 text-gray-300 text-start">Clients</th>
							<th className="text-sm px-6 py-3 text-gray-300 text-start">Prix</th>
							<th className="text-sm px-6 py-3 text-gray-300 text-start">Actions</th>
						</tr>
					</thead>
					<tbody>
					{
						Apps.map((app,index)=>{
							return(
								<tr key={index} className=" border-t-2 w-full h-[22px] ">
							<td className="text-md px-6 py-3 flex flex-row">
								<img className="w-[20px]" src={home}/>
								<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">
									APPart{index+1}
								</div>
							</td>
							<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">{app.client}</td>
							<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">{app.prix}DH</td>
							<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]"><div className="flex flex-row jutify-between">
							<div className="flex flex-row justify-between">
                      <button className="m-3" onClick={() => supprimer(app._id)}>
                        <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                      </button>
                      <button onClick={() => update(app)}>
                        <FontAwesomeIcon icon={faEdit} className="text-green-600"/>
                      </button>
                    </div>
							</div></td>
						</tr>	
							);
						})
					}
					</tbody>
				</table>
			 </div>
				</div>
		
	)
}

export default Appartement;