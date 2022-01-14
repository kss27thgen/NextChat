import { useReducer } from "react";
import { SET_CURRENT_ROOM } from "../types";
import RoomContext from "./RoomContext";
import roomReducer from "./RoomReducer";

const RoomState = (props) => {
	const initialState = {
		currentRoom: null,
	};

	const [state, dispatch] = useReducer(roomReducer, initialState);

	// Set Current Room
	const setCurrentRoom = (room) => {
		dispatch({
			type: SET_CURRENT_ROOM,
			payload: room,
		});
	};

	return (
		<RoomContext.Provider
			value={{
				currentRoom: state.currentRoom,
				setCurrentRoom,
			}}
		>
			{props.children}
		</RoomContext.Provider>
	);
};

export default RoomState;
