import {
	SET_RESULT_LOADING,
	RESULT_GET_ALL,
	RESULT_GAT_ALL_FAILED,
	RESULT_ADD_NEW,
	RESULT_ADD_NEW_FAILED,
} from "../actions/type";

const initialState = {
	loadingResults: false,
	results: [],
	total: 0,
	err: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_RESULT_LOADING:
			return { ...state, loadingResults: true };
		case RESULT_GET_ALL:
			return {
				...state,
				loadingResults: false,
				results: action.payload?.data,
				total: action.payload?.total,
				err: null,
			};

		case RESULT_GAT_ALL_FAILED:
			return {
				...state,
				err: action.payload,
				loadingResults: false,
				results: [],
			};

		case RESULT_ADD_NEW:
			return {
				...state,
				err: null,
				results: [...state.results, action.payload.result],
			};
		case RESULT_ADD_NEW_FAILED:
			return {
				...state,
				err: action.payload,
			};
		default:
			return state;
	}
}
