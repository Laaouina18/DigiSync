import { combineReducers } from "redux";
import { AppReducer } from "./AppReducer";
import { AuthReducer } from "./AuthReducer";
import { PayementReducer } from "./PayementReducer";
const reducers = combineReducers({
    AppReducer,
	AuthReducer,
	PayementReducer
});

export default reducers;
