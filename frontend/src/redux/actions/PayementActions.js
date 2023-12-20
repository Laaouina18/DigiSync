import { actionTypes } from "../types/action-Types";
import axios from "../../api/Axios";
const userString = localStorage.getItem('user');
const userObject = JSON.parse(userString);
const token=userObject?.token;
console.log(token);
const headers = {
	authorization: `Bearer ${token}`,
};

const FetchPayement=()=>{
	return async (dispatch) => {
        const response = await axios.get("/payement",{ headers });
        dispatch({ type: actionTypes.FETCH_PAYEMENT, payload: response.data });
    };
}
const Payement = (date,app) => {
		const appartement={
			_id:app._id,
			client:app.client,
			address:app.address,
			numero:app.numero,
			etage:app.etage,
			immeuble:app.immeuble, 
			prix:app.prix
		}
		console.log(app);
    return async (dispatch) => {
        const response = await axios.post(`/payement`,{date,appartement},{ headers });
        dispatch({ type: actionTypes.PAYEMENT, payload: response.data });

        dispatch(FetchPayement());
    };
};
export {Payement,FetchPayement}