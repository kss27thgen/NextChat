import { useState, useContext, useEffect } from "react";
import SidebarIndex from "../components/SidebarIndex";
import MainIndex from "../components/MainIndex";
import AuthContext from "../context/auth/AuthContext";
import Router from "next/router";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
	const authContext = useContext(AuthContext);
	const { currentUser } = authContext;

	const [onSidebar, setOnSidebar] = useState(false);

	useEffect(() => {
		if (!currentUser) Router.push("/auth");
	}, [currentUser]);

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
						/>
						<MainIndex />
					</>
				)}
			</div>
		</>
	);
};

export default Home;
