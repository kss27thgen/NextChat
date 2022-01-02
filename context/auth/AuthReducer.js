import {
	SET_CURRENT_USER,
	UPDATE_CURRENT_USER,
	CLEAR_CURRENT_USER,
	AUTH_ERROR,
	CLEAR_ERRORS,
} from "../types";

const authReduer = (state, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload,
			};
		case UPDATE_CURRENT_USER:
			return {
				...state,
				currentUser: {
					...state.currentUser,
					...action.payload,
				},
			};
		case CLEAR_CURRENT_USER:
			return {
				...state,
				currentUser: null,
			};
		case AUTH_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export default authReduer;
