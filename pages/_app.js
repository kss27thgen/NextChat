import Head from "next/head";
import AuthContextComponent from "../components/AuthContextComponent";
import AuthState from "../context/auth/AuthState";
import ModalState from "../context/modal/ModalState";
import RoomState from "../context/room/RoomState";
import "../styles/globals.css";
import "../styles/main.sass";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Demo</title>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<AuthState>
				<ModalState>
					<RoomState>
						<AuthContextComponent />
						<Component {...pageProps} />
					</RoomState>
				</ModalState>
			</AuthState>
		</>
	);
}

export default MyApp;
