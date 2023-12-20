import axios from "../../api/Axios";
import { actionTypes } from "../types/action-Types";
const userString = localStorage.getItem('user');
    const userObject = JSON.parse(userString);
	const syndicId = userObject?.syndic?._id;
	const token=userObject?.token;
	console.log(token);
	const headers = {
		authorization: `Bearer ${token}`,
	};
	console.log(headers);
const fetchAPPs = () => {
	
    return async (dispatch) => {
        const response = await axios.get(`syndic/appartement/${syndicId}`,{ headers });
        dispatch({ type: actionTypes.FETCH_APPS, payload: response.data });
    };
};

const CreateAPP = (APP) => {
    const Appartement = {
        numero: APP.numero,
        etage: APP.etage,
        client: APP.client,
        address: APP.address,
        prix: APP.prix,
        immeuble: APP.immeuble,
        syndic: syndicId,
    };

   

    console.log(Appartement);

    return async (dispatch) => {
        const response = await axios.post("/appartements", Appartement,{headers});
        dispatch({ type: actionTypes.CREATE_APP, payload: response.data });

        dispatch(fetchAPPs());
    };
};

const UpdateAPP = (APP, id) => { 
	const {etage,immeuble,prix,numero,client}=APP;
    return async (dispatch) => {
        const response = await axios.patch(`/appartements/${id}`,{etage,immeuble,prix,numero,client},{ headers });
		console.log(response);
        dispatch({ type: actionTypes.UPDATE_APP, payload: response.data });

        dispatch(fetchAPPs());
    };
};
const DeleteAPP = (id) => {
    return async (dispatch) => {
        const response = await axios.delete(`/appartements/${id}`,{ headers });
        dispatch({ type: actionTypes.DELETE_APP, payload: response.data });

        dispatch(fetchAPPs());
    };
};


export { fetchAPPs, CreateAPP, UpdateAPP, DeleteAPP };

