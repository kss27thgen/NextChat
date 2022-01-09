import { SET_MODAL_TYPE, CLEAR_MODAL_TYPE } from "../types";

const modalReducer = (state, action) => {
	switch (action.type) {
		case SET_MODAL_TYPE:
			return {
				...state,
				modalType: action.payload,
			};
		case CLEAR_MODAL_TYPE:
			return {
				...state,
				modalType: "",
			};
		default:
			return state;
	}
};

export default modalReducer;
