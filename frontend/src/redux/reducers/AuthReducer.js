
import { actionTypes } from "../types/action-Types";
  

const initialState={
	user: null,
	error: null,
};

const AuthReducer=(state=initialState,{type,payload})=>{

	switch(type){
		case actionTypes.SIGNIN:
			return {...state,auth:payload};
			case actionTypes.LOGIN_SUCCESS:
				return {
				  ...state,
				  user: payload,
				  error: null,
				};
			  case actionTypes.LOGIN_FAILURE:
				return {
				  ...state,
				  user: null,
				  error: payload,
				};
		default:
			return state;
	}
}
export {AuthReducer}