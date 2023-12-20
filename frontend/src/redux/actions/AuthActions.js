import axios from "../../api/Axios";
import { actionTypes } from "../types/action-Types";


const SigninSyndic = (user) => {
	return async (dispatch) => {
		try {
			const response = await axios.post("/auth/inscrir", user);

			dispatch({ type: actionTypes.SIGNIN_SUCCESS, payload: response.data });
		} catch (error) {
			dispatch({ type: actionTypes.SIGNIN_FAILURE, payload: error.response.data.message });
		}
	

	};
};
const LoginSyndic = (user) => {
	return async (dispatch) => {
		try {
			const response = await axios.post("/auth/login", user);

			dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: response.data });
		} catch (error) {

			dispatch({ type: actionTypes.LOGIN_FAILURE, payload: error.response.data.message });
		}

	};
};

export { SigninSyndic, LoginSyndic }
