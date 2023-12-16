import React ,{useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import Clients from "../components/Clients";
import Factures from "../components/Factures";
import Sidebar from "../components/Sidebar";
import { fetchAPPs  } from "../redux/actions/AppActions";
import {Payement,FetchPayement} from "../redux/actions/PayementActions";
 const Dashboard=()=>{
	const dispatch=useDispatch();
	useEffect(() => {
		dispatch(fetchAPPs());
		dispatch(FetchPayement());
		
	}, [dispatch]);
	const currentDate = new Date();
	const {  month, year } = {
		month: currentDate.getMonth() + 1,
		year: currentDate.getFullYear()
	}
	const date={
		month:month,
		year:year
	}
	const payer=(date,app)=>{
		const {_id,client,address,prix,numero,etage,immeuble}=app;
        
      dispatch(Payement(date,{_id,client,address,prix,numero,etage,immeuble}));
	}

	return(
		<div className="grid xl:grid-cols-[20%_80%] lg:grid-cols-[20%_80%]  w-full h-full bg-gray-100">
		<Sidebar/>
        <div className="flex flex-col p-4">
			<Clients date={date} payer={payer}/>
			<div className="flex justify-center mt-2">
			<Factures/>
			</div>
			
		</div>
      
		</div>
	)
 }
 export default Dashboard;