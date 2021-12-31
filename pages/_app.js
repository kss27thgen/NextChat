import Head from "next/head";
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
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
