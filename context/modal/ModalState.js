import { useReducer } from "react";
import { SET_MODAL_TYPE, CLEAR_MODAL_TYPE } from "../types";
import modalContext from "./ModalContext";
import modalReducer from "./ModalReducer";

const ModalState = (props) => {
	const initialState = {
		modalType: "",
	};

	const [state, dispatch] = useReducer(modalReducer, initialState);

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
				modalType: state.modalType,
				setModalType,
				clearModalType,
			}}
		>
			{props.children}
		</modalContext.Provider>
	);
};

export default ModalState;
