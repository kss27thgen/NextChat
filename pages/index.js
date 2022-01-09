import { useState, useContext, useEffect } from "react";
import SidebarIndex from "../components/index/SidebarIndex";
import MainIndex from "../components/index/MainIndex";
import AuthContext from "../context/auth/AuthContext";
import Router from "next/router";
import LoadingSpinner from "../components/LoadingSpinner";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Modal from "../components/index/modal/Modal";

const Home = () => {
	const authContext = useContext(AuthContext);
	const { currentUser } = authContext;

	const [onSidebar, setOnSidebar] = useState(true);
	const [rooms, setRooms] = useState([]);
	const [onModal, setOnModal] = useState(false);

	useEffect(() => {
		if (!currentUser) Router.push("/auth");
	}, [currentUser]);

	useEffect(() => {
		const unsub = onSnapshot(collection(db, "rooms"), (snapshot) => {
			snapshot
				.docChanges()
				.forEach((change) =>
					setRooms((rooms) => [...rooms, change.doc.data()]),
				);
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
						<Modal onModal={onModal} setOnModal={setOnModal} />

						<SidebarIndex
							onSidebar={onSidebar}
							setOnSidebar={setOnSidebar}
							rooms={rooms}
							onModal={onModal}
							setOnModal={setOnModal}
						/>

						<MainIndex rooms={rooms} />
					</>
				)}
			</div>
		</>
	);
};

export default Home;
