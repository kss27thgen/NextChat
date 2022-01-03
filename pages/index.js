import { signOut } from "firebase/auth";
import Link from "next/link";
import Router from "next/router";
import { auth } from "../firebase";

const Home = () => {
	return (
		<>
			<div className="index">
				<header>
					<ul>
						<li>
							<Link href="/">Home</Link>
						</li>
						<li>
							<Link href="/auth">Auth</Link>
						</li>
						<li
							onClick={() => {
								signOut(auth);
								Router.push("/auth");
							}}
						>
							signOut
						</li>
					</ul>
				</header>
				<main></main>
			</div>
		</>
	);
};

export default Home;
