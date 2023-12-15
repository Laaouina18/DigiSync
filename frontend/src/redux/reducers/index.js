import { combineReducers } from "redux";
import { AppReducer } from "./AppReducer";
import { AuthReducer } from "./AuthReducer";

const reducers = combineReducers({
    AppReducer,
	AuthReducer
});

export default reducers;
