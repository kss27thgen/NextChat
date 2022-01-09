import { useState, useContext, useEffect } from "react";
import SidebarIndex from "../components/index/SidebarIndex";
import MainIndex from "../components/index/MainIndex";
import AuthContext from "../context/auth/AuthContext";
import Router from "next/router";
import LoadingSpinner from "../components/LoadingSpinner";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
	const authContext = useContext(AuthContext);
	const { currentUser } = authContext;

	const [onSidebar, setOnSidebar] = useState(false);
	const [rooms, setRooms] = useState([]);

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

		return () => unsub();
	}, []);

	return (
		<>
			<div className="index">
				{!currentUser || !currentUser.name ? (
					<LoadingSpinner />
				) : (
					<>
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
