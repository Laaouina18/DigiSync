
import { localsName } from "ejs";
import { actionTypes } from "../types/action-Types";


const initialState = {
	user: null,
	error: null,
};

const AuthReducer = (state = initialState, { type, payload }) => {

	switch (type) {
		case actionTypes.SIGNIN_SUCCESS:
			return { ...state, user: null, error: null };
		case actionTypes.SIGNIN_FAILURE:
			localStorage.setItem('message',JSON.stringify(payload));
			return { ...state, user: null, error: null };
		case actionTypes.LOGIN_SUCCESS:
			localStorage.setItem('user',JSON.stringify(payload));
			return {
				...state,
				user: payload,
				error: null,
			};
		case actionTypes.LOGIN_FAILURE:
			localStorage.setItem('message',JSON.stringify(payload));
			return {
				...state,
				user: null,
				error: null,
			};
		default:
			return state;
	}
}
export { AuthReducer }