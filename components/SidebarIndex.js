import Link from "next/link";
import React, { useContext, useEffect } from "react";
import {
	faArrowCircleLeft,
	faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../context/auth/AuthContext";
import Router from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const SidebarIndex = ({ onSidebar, setOnSidebar }) => {
	const authContext = useContext(AuthContext);
	const { currentUser } = authContext;

	return (
		<>
			<aside className={`${onSidebar ? "on" : "off"} sidebar`}>
				<div className="sidebar--currentUser">
					{/* <p>
						<img src={photoUrl} alt="avatar" />
					</p> */}
					<strong>
						{currentUser ? currentUser.name : "username"}
					</strong>
					<FontAwesomeIcon
						icon={faDoorOpen}
						onClick={() => {
							if (confirm("Logout?")) {
								Router.push("/auth");
								signOut(auth);
							}
						}}
					/>
				</div>

				<div>
					<FontAwesomeIcon
						className={onSidebar ? "on" : "off"}
						icon={faArrowCircleLeft}
						onClick={() => setOnSidebar(!onSidebar)}
					/>
				</div>
			</aside>
		</>
	);
};

export default SidebarIndex;
