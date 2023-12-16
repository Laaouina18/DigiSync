import { actionTypes } from "../types/action-Types";
import axios from "../../api/Axios";
const FetchPayement=()=>{
	return async (dispatch) => {
        const response = await axios.get("/payement");
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
        const response = await axios.post(`/payement`,{date,appartement});
        dispatch({ type: actionTypes.PAYEMENT, payload: response.data });

        dispatch(FetchPayement());
    };
};
export {Payement,FetchPayement}