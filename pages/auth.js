import React, { useState } from "react";

const initialFormData = {
	name: "",
	email: "",
	password: "",
};

const Auth = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState(initialFormData);
	const { name, email, password } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const register = () => {
		console.log("register", formData);
	};

	const login = () => {
		console.log("login", formData);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isLogin) {
			login();
		} else {
			register();
		}
		setFormData(initialFormData);
	};

	return (
		<>
			<div className="auth">
				<section className="auth--mainBox">
					<h2>{isLogin ? "Login" : "Register"}</h2>
					<form className="form" onSubmit={handleSubmit}>
						<div className="form--item">
							<input
								type="text"
								placeholder="Name"
								name="name"
								value={name}
								onChange={handleChange}
							/>
						</div>
						<div className="form--item">
							<input
								type="email"
								placeholder="E-mail"
								name="email"
								value={email}
								onChange={handleChange}
							/>
						</div>
						<div className="form--item">
							<input
								type="password"
								placeholder="Password"
								name="password"
								value={password}
								onChange={handleChange}
							/>
						</div>
						<button
							className="form--button"
							disabled={!name || !email || !password}
						>
							Submit
						</button>
					</form>
					<p onClick={() => setIsLogin(!isLogin)}>
						{isLogin ? "Not registered yet?" : "Login?"}
					</p>
				</section>
			</div>
		</>
	);
};

export default Auth;
