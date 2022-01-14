import { useState, useContext, useEffect } from "react";
import SidebarIndex from "../components/index/SidebarIndex";
import MainIndex from "../components/index/MainIndex";
import AuthContext from "../context/auth/AuthContext";
import Router from "next/router";
import LoadingSpinner from "../components/LoadingSpinner";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Modal from "../components/index/modal/Modal";
import RoomContext from "../context/room/RoomContext";

const Home = () => {
	const authContext = useContext(AuthContext);
	const { currentUser } = authContext;

	const roomContext = useContext(RoomContext);
	const { setCurrentRoom } = roomContext;

	const [onSidebar, setOnSidebar] = useState(true);
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		if (!currentUser) Router.push("/auth");
	}, [currentUser]);

	let result = [];
	useEffect(() => {
		const unsub = onSnapshot(collection(db, "rooms"), (snapshot) => {
			snapshot.docChanges().forEach((change) => {
				if (change.type === "added") {
					console.log("added");
					result.push({ id: change.doc.id, ...change.doc.data() });
				}
				if (change.type === "modified") {
					console.log("modified");
					let index = result.findIndex(
						(room) => room.id === change.doc.id,
					);
					result[index] = { id: change.doc.id, ...change.doc.data() };
					setCurrentRoom(result[index]);
				}
				if (change.type === "removed") {
					console.log("removed");
					result = result.filter((room) => room.id !== change.doc.id);
				}
			});
			console.log("run setRooms", result);
			setRooms(result);
		});

		return () => {
			unsub();
			setRooms([]);
		};
	}, []);

	return (
		<>
			<div className="index">
				{!currentUser || !currentUser.name ? (
					<LoadingSpinner />
				) : (
					<>
						<Modal />

						<SidebarIndex
							onSidebar={onSidebar}
							setOnSidebar={setOnSidebar}
							rooms={rooms}
						/>

						<MainIndex rooms={rooms} />
					</>
				)}
			</div>
		</>
	);
};

export default Home;
