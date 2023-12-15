import React from "react";

import User from "../assets/img/User.png";
const Clients = () => {

	return (
		<div className="w-full h-full bg-white border rounded-[8.08px] m-2">
			<h4 className=" text-l px-6 text-black-100">Clients</h4>

			<div className="p-4">

				<table className="w-full relative  mb-6 ">
					<thead>
						<tr className=" w-full ">
							<th className="text-sm px-6 py-3 text-gray-300 text-start ">Owner Name</th>
							<th className="text-sm px-6 py-3 text-gray-300 text-start">Apparts</th>
							<th className="text-sm px-6 py-3 text-gray-300 text-start">Status</th>
							<th className="text-sm px-6 py-3 text-gray-300 text-start">Date</th>
						</tr>
					</thead>
					<tbody>
						<tr className=" border-t-2 w-full h-[22px] ">
							<td className="text-md px-6 py-3 flex flex-row">
								<img className="w-[30px]" src={User} />
								<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px] ml-2">
									Alex Liras
								</div>
							</td>
							<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">millimetres (mm)</td>
							<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">
								<button className="border px-4 py-1 bg-green-600 text-white rounded-[6px]">Payed</button>
							</td>
							<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">14-06-2023</td>
						</tr>

						<tr className=" border-t-2 w-full ">
							<td className="text-md px-6 py-3 flex flex-row">
								<img className="w-[30px]" src={User} />
								<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px] ml-2">
									Alex Liras
								</div>
							</td>
							<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">centimetres (cm)</td>
							<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">
								<button className="border px-4 py-1 bg-green-600 text-white rounded-[6px]">Payed</button>
							</td>
							<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">14-06-2023</td>
						</tr>

						<tr className=" border-t-2 w-full h-[22px] ">
							<td className="text-md px-6 py-3 flex flex-row">
								<img className="w-[30px]" src={User} />
								<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px] ml-2">
									Alex Liras
								</div>
							</td>
							<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">millimetres (mm)</td>
							<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">
								<button className="border px-4 py-1 bg-green-600 text-white rounded-[6px]">Payed</button>
							</td>
							<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">-</td>
						</tr>

						<tr className=" border-t-2 w-full">
							<td className="text-md px-6 py-3 flex flex-row">
								<img className="w-[30px]" src={User} />
								<div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px] ml-2">
									Alex Liras
								</div>
							</td>
							<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">metres (m)</td>
							<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">
								<button className="border px-4 py-1 bg-green-600 text-white rounded-[6px]">Payed</button>
							</td>
							<td className="text-md px-6 py-3 font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">-</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

	)
}

export default Clients;