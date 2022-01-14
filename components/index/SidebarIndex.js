import Link from "next/link";
import React, { useContext } from "react";
import {
	faArrowCircleLeft,
	faDoorOpen,
	faEdit,
	faPlusSquare,
	faTimes,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../../context/auth/AuthContext";
import ModalContext from "../../context/modal/ModalContext";
import RoomContext from "../../context/room/RoomContext";
import Router from "next/router";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";

const SidebarIndex = ({ onSidebar, setOnSidebar, rooms }) => {
	const authContext = useContext(AuthContext);
	const { currentUser } = authContext;
	const { name, photoUrl, id } = currentUser;

	const modalContext = useContext(ModalContext);
	const { setModalType, modalOn } = modalContext;

	const roomContext = useContext(RoomContext);
	const { setCurrentRoom } = roomContext;

	return (
		<>
			<aside className={`${onSidebar ? "on" : "off"} sidebar`}>
				<div className="sidebar--currentUser">
					<p>
						<img
							src={photoUrl}
							alt="avatar"
							onClick={() => Router.push(`/users/${id}`)}
						/>
					</p>
					<strong>{name ? name : "username"}</strong>
				</div>

				<div className="sidebar--userMenu">
					<div className="wrapper">
						<ul>
							<li onClick={() => Router.push(`/users/${id}`)}>
								<p>Profile</p>
								<FontAwesomeIcon icon={faUser} />
							</li>
							<li
								onClick={() => {
									if (confirm("Logout?")) {
										Router.push("/auth");
										signOut(auth);
									}
								}}
							>
								<p>Logout</p>
								<FontAwesomeIcon icon={faDoorOpen} />
							</li>
						</ul>
					</div>
				</div>

				<div className="sidebar--roomList">
					<div className="create">
						<p>Create Room</p>
						<FontAwesomeIcon
							icon={faPlusSquare}
							onClick={() => {
								setModalType("createRoom");
								modalOn();
							}}
						/>
					</div>
					<ul>
						{rooms.map((room) => (
							<li
								key={room.id}
								onClick={() => {
									setCurrentRoom(room);
								}}
							>
								<p>{room.roomname}</p>
								<FontAwesomeIcon
									icon={faEdit}
									onClick={() => {
										setModalType("editRoomname");
										modalOn();
									}}
								/>
								<FontAwesomeIcon
									icon={faTimes}
									onClick={async () => {
										if (confirm("Delete this room, OK?")) {
											await deleteDoc(
												doc(db, "rooms", room.id),
											);
											setCurrentRoom({
												id: "",
												roomname: "",
												messages: [],
											});
										}
									}}
								/>
							</li>
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
