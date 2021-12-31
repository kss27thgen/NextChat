import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const initialFormData = {
	name: "",
	email: "",
	password: "",
};

const Auth = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState(initialFormData);
	const [showPassword, setShowPassword] = useState(false);

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
						<div className="form--item form--item-password">
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								name="password"
								value={password}
								onChange={handleChange}
							/>
							<FontAwesomeIcon
								className={showPassword ? "" : "off"}
								icon={faEye}
								onClick={() => setShowPassword(!showPassword)}
							/>
						</div>
						<button
							className="form--button"
							disabled={!name.trim() || !email || !password}
						>
							Submit
						</button>
					</form>
					<span
						className="form--note"
						onClick={() => setIsLogin(!isLogin)}
					>
						{isLogin ? "Not registered yet?" : "Go to Login?"}
					</span>
				</section>
			</div>
		</>
	);
};

export default Auth;
