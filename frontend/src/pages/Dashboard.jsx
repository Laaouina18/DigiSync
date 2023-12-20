import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateAPP, fetchAPPs ,DeleteAPP,UpdateAPP} from "../redux/actions/AppActions.js";
import Cart from "../components/cart";
import Appartement from "../components/Appartement";
import Sidebar from "../components/Sidebar";
import Form from "../components/Form";
import logo from "../assets/img/Logo.png";

const Dashboard = () => {
	const [ajouter,setAjouter]=useState(false);
	const [type,setType]=useState("submit");
	const [selectedId,setSelectedId]=useState("");
	const Apps = useSelector((state) => state.AppReducer.APPs);
	const dispatch = useDispatch();
	const [status, setStatus] = useState(false);
	const [FormData, setFormdata] = useState({
		etage: "",
		numero: "",
		immeuble: "",
		client: "",
		address: "",
		prix: ""
	})
	const handleChange = (e) => {
		const { value, name } = e.target;
		
		setFormdata((prv) => ({
			...prv, [name]: value
		}));
		
	}
	const isValidPrice = (price) => {
		return !isNaN(parseFloat(price)) && isFinite(price);
	  };
	
	  const isValidEtage = (etage) => {
		return typeof etage === "number" || (typeof etage === "string" && etage.trim() !== "");
	  };
	  const Show=()=>{
        setAjouter(true);
	  }
	useEffect(() => {
		dispatch(fetchAPPs());
	}, [dispatch])
	const handleSubmit = () => {
		if (!isValidPrice(FormData.prix) || !isValidEtage(FormData.etage)) {
			alert("Invalid price or etage");
			return;
		  }
		  const fieldsWithErrors = Object.keys(FormData).filter((field) => FormData[field].trim() === "");
		  if (fieldsWithErrors.length > 0) {
			  alert(`Please fill in all fields: ${fieldsWithErrors.join(", ")}`);
			  return;
			}
		dispatch(CreateAPP(FormData));
		setFormdata({
			etage: "",
			numero: "",
			immeuble: "",
			client: "",
			address: "",
			prix: ""
		});
		setStatus(false);
		setAjouter(false);

	}
	const Clear = () => {
        setType("submit");
		setStatus(false);
		setFormdata({
			etage: "",
			numero: "",
			immeuble: "",
			client: "",
			address: "",
			prix: ""
		});
		setAjouter(false)
	};
	const supprimer=(id)=>{
		if(window.confirm("vous voulez supprimer cette appartemen?")){
     dispatch(DeleteAPP(id));
	 alert('Apartment deleted successfully!');
		}
	}
	const handleupdate=(app)=>{
		setStatus(true);
		setSelectedId(app._id);
		setFormdata(app);
		setType("update");
	}
	const chnangerstatus=()=>{
setStatus(true);
setAjouter(false);

	}
	const update=()=>{
		if (!isValidPrice(FormData.prix) || !isValidEtage(FormData.etage)) {
			alert("Invalid price or etage");
			return;
		  }
		//   const fieldsWithErrors = Object.keys(FormData).filter((field) => FormData[field].trim() === "");
		//   if (fieldsWithErrors.length > 0) {
		// 	  alert(`Please fill in all fields: ${fieldsWithErrors.join(", ")}`);
		// 	  return;
		// 	}
      dispatch(UpdateAPP(FormData,selectedId));
	  setType("submit");
	  setFormdata({
		etage: "",
		numero: "",
		immeuble: "",
		client: "",
		address: "",
		prix: ""
	});
	alert('Apartment updated successfully!');
	setStatus(false);
	}
	return (
		<div className="flex flex-col p-4 w-full  h-screen bg-gray-100">
		<div className="p-4">
          <img className="p-5 w-[200px]" src={logo} alt="Logo" />
        </div>
			<div className="grid xl:grid-cols-[20%_80%] lg:grid-cols-[20%_80%] ">
			<Sidebar />
			<div className="flex flex-col p-4">
				<Cart numAPP={Apps.length}/>
				<Appartement show={Show} ajouter={ajouter} handlClick={ chnangerstatus} supprimer={supprimer} update={handleupdate}/>
			</div>
			<Form type={type} update={update} status={status} clear={Clear} setStatus={setStatus} formData={FormData} handleChange={handleChange} handleSubmit={handleSubmit} />
		</div>
		</div>
		
	)
}
export default Dashboard;