import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateCurrentUser,
	updateProfile,
} from "firebase/auth";
import Router from "next/router";
import AuthContext from "../context/auth/AuthContext";

const initialFormData = {
	name: "",
	email: "",
	password: "",
	passwordConf: "",
};

const Auth = () => {
	const authContext = useContext(AuthContext);
	const { updateCurrentUser } = authContext;

	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState(initialFormData);
	const [showPassword, setShowPassword] = useState(false);

	const { name, email, password, passwordConf } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const register = async () => {
		try {
			const res = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			await updateProfile(res.user, {
				displayName: name,
				photoURL: "https://example.com/jane-q-user/profile.jpg",
			});
			updateCurrentUser({
				name,
				photoUrl: "https://example.com/jane-q-user/profile.jpg",
			});
			Router.push("/");
		} catch (error) {
			alert(error.message);
		}
	};

	const login = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			Router.push("/");
		} catch (error) {
			alert(error.message);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== passwordConf) {
			return alert("Passwords don't match.");
		}
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
						{!isLogin && (
							<div className="form--item">
								<input
									type="text"
									placeholder="Name"
									name="name"
									value={name}
									onChange={handleChange}
								/>
							</div>
						)}
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
						<div className="form--item form--item-password">
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Password Confirmation"
								name="passwordConf"
								value={passwordConf}
								onChange={handleChange}
							/>
							{/* <FontAwesomeIcon
								className={showPassword ? "" : "off"}
								icon={faEye}
								onClick={() => setShowPassword(!showPassword)}
							/> */}
						</div>
						<button
							className="form--button"
							disabled={
								(!isLogin && !name.trim()) ||
								!email ||
								!password ||
								!passwordConf
							}
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
