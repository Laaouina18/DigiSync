import React ,{useState} from "react";

import Clients from "../components/Clients";
import Factures from "../components/Factures";
import Sidebar from "../components/Sidebar";

 const Dashboard=()=>{

	return(
		<div className="grid xl:grid-cols-[20%_80%] lg:grid-cols-[20%_80%]  w-full h-full bg-gray-100">
		<Sidebar/>
        <div className="flex flex-col p-4">
			<Clients />
			<div className="flex justify-center mt-2">
			<Factures/>
			</div>
			
		</div>
      
		</div>
	)
 }
 export default Dashboard;