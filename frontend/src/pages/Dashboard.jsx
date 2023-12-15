import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateAPP, fetchAPPs ,DeleteAPP,UpdateAPP} from "../redux/actions/AppActions.js";
import Cart from "../components/cart";
import Appartement from "../components/Appartement";
import Sidebar from "../components/Sidebar";
import Form from "../components/Form";
const Dashboard = () => {
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
	useEffect(() => {
		dispatch(fetchAPPs());
	}, [dispatch])
	const handleSubmit = () => {
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
	};
	const supprimer=(id)=>{
     dispatch(DeleteAPP(id));
	}
	const handleupdate=(app)=>{
		setStatus(true);
		setSelectedId(app._id);
		setFormdata(app);
		setType("update");
	}
	const update=()=>{
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
	setStatus(false);
	}
	return (
		<div className="grid xl:grid-cols-[20%_80%] lg:grid-cols-[20%_80%]  w-full h-screen bg-gray-100">
			<Sidebar />
			<div className="flex flex-col p-4">
				<Cart numAPP={Apps.length}/>
				<Appartement handlClick={() => setStatus(true)} supprimer={supprimer} update={handleupdate}/>
			</div>
			<Form type={type} update={update} status={status} clear={Clear} setStatus={setStatus} formData={FormData} handleChange={handleChange} handleSubmit={handleSubmit} />
		</div>
	)
}
export default Dashboard;