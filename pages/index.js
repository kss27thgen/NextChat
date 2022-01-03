import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { auth } from "../firebase";

const Home = () => {
	const [onSidebar, setOnSidebar] = useState(true);

	return (
		<>
			<div className="index">
				<div className={`${onSidebar ? "on" : "off"} index--wrapper`}>
					<aside>
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
						<FontAwesomeIcon
							className={onSidebar ? "on" : "off"}
							icon={faArrowCircleLeft}
							onClick={() => setOnSidebar(!onSidebar)}
						/>
					</aside>
					<main>main</main>
				</div>
			</div>
		</>
	);
};

export default Home;
