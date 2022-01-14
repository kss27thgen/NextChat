import {
	SET_MODAL_TYPE,
	CLEAR_MODAL_TYPE,
	MODAL_ON,
	MODAL_OFF,
} from "../types";

const modalReducer = (state, action) => {
	switch (action.type) {
		case MODAL_ON:
			return {
				...state,
				modalStatus: true,
			};
		case MODAL_OFF:
			return {
				...state,
				modalStatus: false,
			};
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
