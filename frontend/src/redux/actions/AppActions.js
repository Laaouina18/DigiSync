import axios from "../../api/Axios";
import { actionTypes } from "../types/action-Types";

const fetchAPPs = () => {
    return async (dispatch) => {
        const response = await axios.get("/appartements");
        dispatch({ type: actionTypes.FETCH_APPS, payload: response.data });
    };
};

const CreateAPP = (APP) => {
    return async (dispatch) => {
        const response = await axios.post("/appartements", APP);
        dispatch({ type: actionTypes.CREATE_APP, payload: response.data });

        dispatch(fetchAPPs());
    };
};
const UpdateAPP = (APP, id) => { 
	const {etage,immeuble,prix,numero,client}=APP;
    return async (dispatch) => {
        const response = await axios.patch(`/appartements/${id}`,{etage,immeuble,prix,numero,client});
		console.log(response);
        dispatch({ type: actionTypes.UPDATE_APP, payload: response.data });

        dispatch(fetchAPPs());
    };
};
const DeleteAPP = (id) => {
    return async (dispatch) => {
        const response = await axios.delete(`/appartements/${id}`);
        dispatch({ type: actionTypes.DELETE_APP, payload: response.data });

        dispatch(fetchAPPs());
    };
};


export { fetchAPPs, CreateAPP, UpdateAPP, DeleteAPP };

