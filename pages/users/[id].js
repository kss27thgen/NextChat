import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import Link from "next/link";
import Router from "next/router";
import React, { useContext } from "react";
import { useEffect } from "react/cjs/react.development";
import AuthContext from "../../context/auth/AuthContext";
import { auth } from "../../firebase";
import LoadingSpinner from "../../components/LoadingSpinner";

const UserProfile = () => {
	const authContext = useContext(AuthContext);
	const { currentUser } = authContext;

	useEffect(() => {
		if (!currentUser) Router.push("/auth");
	}, [currentUser]);

	if (!currentUser || !currentUser.name) return <LoadingSpinner />;

	const { name } = currentUser;

	return (
		<div className="singleUser">
			<section className="username">
				<h1>{name}</h1>
				<FontAwesomeIcon
					icon={faDoorOpen}
					onClick={() => {
						if (confirm("Logout?")) {
							Router.push("/auth");
							signOut(auth);
						}
					}}
				/>
			</section>
			<Link href="/">Back to Index</Link>
		</div>
	);
};

export default UserProfile;
