import Link from "next/link";

const Home = () => {
	return (
		<>
			<header>
				<ul>
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/auth">Auth</Link>
					</li>
				</ul>
			</header>
			<main></main>
		</>
	);
};

export default Home;
