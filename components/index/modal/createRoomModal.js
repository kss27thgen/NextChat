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
import ModalContext from "../../../context/modal/ModalContext";
import { db } from "../../../firebase";

const CreateRoomModal = () => {
	const modalContext = useContext(ModalContext);
	const { modalOff, setModalType, modalType } = modalContext;

	const [roomname, setRoomname] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const roomData = {
			roomname,
			messages: [{ id: "123", text: "Hello my friend." }],
			timpstamp: serverTimestamp(),
		};

		if (confirm("Are you OK?")) {
			await addDoc(collection(db, "rooms"), roomData);

			setRoomname("");
			setModalType("");
			modalOff();
		}
	};

	return (
		<section className="createRoom">
			<h3>Create Room</h3>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Type Room Name..."
					value={roomname}
					onChange={(e) => setRoomname(e.target.value)}
				/>
				<button type="submit">
					<FontAwesomeIcon icon={faCheckCircle} />
				</button>
			</form>
		</section>
	);
};

export default CreateRoomModal;
