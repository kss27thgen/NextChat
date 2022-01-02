import Head from "next/head";
import AuthContextComponent from "../components/AuthContextComponent";
import AuthState from "../context/auth/AuthState";
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
				<AuthContextComponent />
				<Component {...pageProps} />
			</AuthState>
		</>
	);
}

export default MyApp;
