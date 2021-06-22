import {
	SET_CATEGORY_LOADING,
	CATEGORY_GET_ALL,
	CATEGORY_GET_ALL_FAILED,
	DELETE_CATEGORY,
	CREATE_CATEGORY,
	UPDATE_CATEGORY,
} from "../actions/type";

const initialState = {
	loadingCategory: false,
	categories: [],
	err: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_CATEGORY_LOADING:
			return { ...state, loadingCategory: true };
		case CATEGORY_GET_ALL:
			return {
				...state,
				loadingCategory: false,
				categories: action.payload,
				err: null,
			};
		case CATEGORY_GET_ALL_FAILED:
			return {
				...state,
				err: action.payload,
				loadingCategory: false,
				categories: [],
			};

		case DELETE_CATEGORY:
			return {
				...state,
				categories: state.categories.filter(
					(e) => e._id !== action.payload.id
				),
			};

		case CREATE_CATEGORY:
			return {
				...state,
				categories: [...state.categories, action.payload?.category],
			};

		case UPDATE_CATEGORY:
			console.log(action.payload);
			return {
				...state,
				categories: state.categories.map((e) =>
					e._id === action.payload?.ques?._id
						? action.payload?.ques
						: e
				),
			};
		default:
			return state;
	}
}
