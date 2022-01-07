import { useReducer } from "react";
import authContext from "./AuthContext";
import authReducer from "./AuthReducer";
import {
	SET_CURRENT_USER,
	UPDATE_CURRENT_USER,
	CLEAR_CURRENT_USER,
	AUTH_ERROR,
	CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
	const initialState = {
		currentUser: {
			id: "",
			name: "",
			photoUrl: "",
			email: "",
		},
		error: null,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// Set Current User
	const setCurrentUser = (user) => {
		dispatch({
			type: SET_CURRENT_USER,
			payload: user,
		});
	};

	// Update Current User
	const updateCurrentUser = (attr) => {
		dispatch({
			type: UPDATE_CURRENT_USER,
			payload: attr,
		});
	};

	// Clear Current User
	const clearCurrentUser = () => {
		dispatch({ type: CLEAR_CURRENT_USER });
	};

	// Clear errors
	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};

	return (
		<authContext.Provider
			value={{
				currentUser: state.currentUser,
				error: state.error,
				clearErrors,
				setCurrentUser,
				updateCurrentUser,
				clearCurrentUser,
			}}
		>
			{props.children}
		</authContext.Provider>
	);
};

export default AuthState;
