import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import ModalContext from "../../../context/modal/ModalContext";
import RoomContext from "../../../context/room/RoomContext";
import { db } from "../../../firebase";

const CreateRoomModal = () => {
	const modalContext = useContext(ModalContext);
	const { modalOff, setModalType, modalType } = modalContext;

	const roomContext = useContext(RoomContext);
	const { currentRoom } = roomContext;

	const [roomnameState, setRoomnameState] = useState(currentRoom.roomname);

	useEffect(() => {
		modalType === "createRoom" && setRoomnameState("");
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const roomData = {
			roomname: roomnameState,
			messages: [{ id: "123", text: "Hello my friend." }],
			timpstamp: serverTimestamp(),
		};

		if (confirm("Are you OK?")) {
			if (modalType === "createRoom") {
				await addDoc(collection(db, "rooms"), roomData);
			} else if (modalType === "editRoomname") {
				await updateDoc(doc(db, "rooms", currentRoom.id), {
					roomname: roomnameState,
				});
			}

			setRoomnameState("");
			setModalType("");
			modalOff();
		}
	};

	const displayModalTitle = () => {
		switch (modalType) {
			case "createRoom":
				return "CreateRoom";
				break;
			case "editRoomname":
				return "Edit Room Name";
				break;
			default:
				break;
		}
	};

	return (
		<section className="createRoom">
			<h3>{displayModalTitle()}</h3>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Type Room Name..."
					value={roomnameState}
					onChange={(e) => setRoomnameState(e.target.value)}
				/>
				<button type="submit">
					<FontAwesomeIcon icon={faCheckCircle} />
				</button>
			</form>
		</section>
	);
};

export default CreateRoomModal;
