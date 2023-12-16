import { actionTypes } from "../types/action-Types";

const intialState = {
    APPs: []
};
const AppReducer = (state = intialState, { type, payload }) => {
	
    switch (type) {
        case actionTypes.FETCH_APPS:
            return { ...state, APPs: payload };

        case actionTypes.CREATE_APP:
            return { ...state, newAPP: payload };
        case actionTypes.UPDATE_APP:
            return { ...state, updatedAPP: payload };
        case actionTypes.DELETE_APP:
            return { ...state, deleteAPP: payload };
		
        default:
            return state;
    }
};

export { AppReducer };
