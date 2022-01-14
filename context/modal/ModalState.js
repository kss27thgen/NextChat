import { useReducer } from "react";
import {
	SET_MODAL_TYPE,
	CLEAR_MODAL_TYPE,
	MODAL_ON,
	MODAL_OFF,
} from "../types";
import modalContext from "./ModalContext";
import modalReducer from "./ModalReducer";

const ModalState = (props) => {
	const initialState = {
		modalStatus: false,
		modalType: "",
	};

	const [state, dispatch] = useReducer(modalReducer, initialState);

	// Modal status on
	const modalOn = () => {
		dispatch({ type: MODAL_ON });
	};

	// Modal status off
	const modalOff = () => {
		dispatch({ type: MODAL_OFF });
	};

	// Set Modal Type
	const setModalType = (type) => {
		dispatch({
			type: SET_MODAL_TYPE,
			payload: type,
		});
	};

	// Clear Modal Type
	const clearModalType = () => {
		dispatch({ type: CLEAR_MODAL_TYPE });
	};

	return (
		<modalContext.Provider
			value={{
				modalStatus: state.modalStatus,
				modalType: state.modalType,
				modalOn,
				modalOff,
				setModalType,
				clearModalType,
			}}
		>
			{props.children}
		</modalContext.Provider>
	);
};

export default ModalState;
