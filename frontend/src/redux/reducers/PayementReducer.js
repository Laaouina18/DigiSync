import { actionTypes } from "../types/action-Types";

const intialState = {
    Payements:[{}]
};
const PayementReducer = (state = intialState, { type, payload }) => {
	
    switch (type) {
        case actionTypes.FETCH_PAYEMENT:
            return { ...state, Payements: payload };
			case actionTypes.PAYEMENT:
				return { ...state, PayementAPP: payload };
        default:
            return state;
    }
};

export { PayementReducer };
