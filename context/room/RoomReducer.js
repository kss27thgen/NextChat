import { SET_CURRENT_ROOM } from "../types";

const roomReducer = (state, action) => {
	switch (action.type) {
		case SET_CURRENT_ROOM:
			return {
				...state,
				currentRoom: action.payload,
			};
		default:
			return state;
	}
};

export default roomReducer;
