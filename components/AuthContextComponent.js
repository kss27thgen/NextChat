import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth/AuthContext";
import { auth } from "../firebase";

const AuthContextComponent = () => {
	const authContext = useContext(AuthContext);

	const { setCurrentUser, clearCurrentUser } = authContext;

	useEffect(() => {
		const onSub = onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurrentUser({
					id: user.uid,
					name: user.displayName,
					email: user.email,
					photoUrl: user.photoURL,
				});
			} else {
				clearCurrentUser();
			}
		});
		return () => {
			onSub();
		};
	}, []);
	return <></>;
};

export default AuthContextComponent;
