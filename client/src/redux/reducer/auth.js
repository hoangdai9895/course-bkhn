import { SET_CURRENT_USER, LOGIN_FAILED, LOGIN_LOADING } from "../actions/type";

const initialState = {
	isAuthenticated: false,
	user: {},
	isAdmin: false,
	loading: false,
	registerStatus: false,
	error: "",
};

const isEmpty = (value) =>
	value === undefined ||
	value === null ||
	(typeof value === "object" && Object.keys(value).length === 0) ||
	(typeof value === "string" && value.trim().length === 0);

export default function (state = initialState, action) {
	switch (action.type) {
		case LOGIN_LOADING:
			return { ...state, loading: true };
		case SET_CURRENT_USER:
			return {
				...state,
				user: action.payload,
				isAuthenticated: !isEmpty(action.payload),
				isAdmin: action.payload.role === 0 ? true : false,
				loading: false,
				error: "",
			};
		case LOGIN_FAILED:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
}
