import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../assets/img/User.png";
import { Payement } from "../redux/actions/PayementActions";
import {PDFDownloadLink} from '@react-pdf/renderer';

import Facture from './Facture';
const Clients = ({date,payer}) => {
	
const Apps = useSelector((state) => state.AppReducer.APPs);
const payement = useSelector((state) => state.PayementReducer.Payements);
	return (
		<div className="w-full h-full bg-white border rounded-[8.08px] ml-2">
			<h4 className=" text-l px-6 text-black-100 pt-2">Clients</h4>

			<div className="p-4">

				<table className="w-full relative  mb-6 ">
					<thead>
						<tr className=" w-full ">
							<th className="text-sm px-6 py-3 text-gray-300 text-start ">Owner Name</th>
							<th className="text-sm px-6 py-3 text-gray-300 text-start">Apparts</th>
							<th className="text-sm px-6 py-3 text-gray-300 text-start">Status</th>
							<th className="text-sm px-6 py-3 text-gray-300 text-start">Date</th>
							<th className="text-sm px-6 py-3 text-gray-300 text-start">Facture</th>
						</tr>
					</thead>
					<tbody>
						{Apps.map((app, index) => {
							return (
								<tr className=" border-t-2 w-full h-[22px] " key={index}>
									<td className="text-md px-6 py-3 flex flex-row">
										<img className="w-[30px]" src={User} />
										<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px] ml-2">
											{app.client}
										</div>
									</td>
									<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">APP{index + 1}</td>
									<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">
					
									{payement.find((x)=>x.appartement===app._id && x.date.month===date.month && x.date.year===date.year)?(
										
						
					
					<button className="border px-4 py-1 bg-gray-600 text-white rounded-[6px]" >Payed</button>
									
										
									
									):(<button className="border px-4 py-1 bg-green-600 text-white rounded-[6px]" onClick={()=>payer(date,app)}>Payer</button>
							)}
									</td>
									<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">{date.month}/{date.year}</td>
						<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">
						<PDFDownloadLink document={<Facture apartment={app}/>} fileName="Facture Payment"  >
						telecharger
          </PDFDownloadLink>
						</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>

	)
}

export default Clients;