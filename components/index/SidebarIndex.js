import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
	faArrowCircleLeft,
	faDoorOpen,
	faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../../context/auth/AuthContext";
import Router from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const SidebarIndex = ({
	onSidebar,
	setOnSidebar,
	rooms,
	onModal,
	setOnModal,
}) => {
	const authContext = useContext(AuthContext);
	const { currentUser } = authContext;
	const { name, photoUrl, id } = currentUser;

	return (
		<>
			<aside className={`${onSidebar ? "on" : "off"} sidebar`}>
				<div className="sidebar--currentUser">
					<Link href={`/users/${id}`}>
						<a>
							<p>
								<img src={photoUrl} alt="avatar" />
							</p>
							<strong>{name ? name : "username"}</strong>
						</a>
					</Link>
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

				<div className="sidebar--roomList">
					<div className="create">
						<p>Create a Room</p>
						<FontAwesomeIcon
							icon={faPlusSquare}
							onClick={() => setOnModal(!onModal)}
						/>
					</div>
					<ul>
						{rooms.map((room) => (
							<li key={room.id}>{room.roomname}</li>
						))}
					</ul>
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
