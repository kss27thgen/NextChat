import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEye,
	faUser,
	faTimes,
	faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { auth, storage } from "../firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Router from "next/router";
import AuthContext from "../context/auth/AuthContext";

const initialFormData = {
	name: "",
	email: "",
	password: "",
	passwordConf: "",
};
const initialFileData = {
	fileObject: null,
	fileName: "",
};

const Auth = () => {
	const authContext = useContext(AuthContext);
	const { updateCurrentUser } = authContext;

	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState(initialFormData);
	const [fileData, setFileData] = useState(initialFileData);
	const [showPassword, setShowPassword] = useState(false);

	const { name, email, password, passwordConf } = formData;
	const { fileObject, fileName } = fileData;

	const handleChange = (e) => {
		if (e.target.name === "fileData" && e.target.files[0]) {
			setFileData({
				...fileData,
				fileObject: e.target.files[0],
				fileName: e.target.files[0].name,
			});
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};

	const setAvatarUrl = async () => {
		const storageRef = ref(storage, `avatars/${fileName}`);
		await uploadBytes(storageRef, fileObject);
		return getDownloadURL(ref(storage, `avatars/${fileName}`));
	};

	const register = async () => {
		let avatarUrl =
			"https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar";

		try {
			if (fileObject) {
				avatarUrl = await setAvatarUrl();
			}

			// SignUp on firebase/auth
			const res = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			// update profile on firebase/auth
			await updateProfile(res.user, {
				displayName: name,
				photoURL: avatarUrl,
			});
			// update current-user state
			updateCurrentUser({
				name,
				photoUrl: avatarUrl,
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
							<>
								<div className="form--item">
									<div className="avatar">
										<label htmlFor="fileData">
											<FontAwesomeIcon
												icon={faUserPlus}
											/>
										</label>
										<div>
											{fileName ? (
												<>
													<div className="filename">
														<span>
															{fileName.length >
															30
																? fileName.substr(
																		1,
																		30,
																  ) + "..."
																: fileName}
														</span>
														<FontAwesomeIcon
															icon={faTimes}
															onClick={() =>
																setFileData(
																	initialFileData,
																)
															}
														/>
													</div>
												</>
											) : (
												<label htmlFor="fileData">
													AVATAR
												</label>
											)}
										</div>
										<input
											style={{ display: "none" }}
											type="file"
											name="fileData"
											onChange={handleChange}
											id="fileData"
										/>
									</div>
								</div>
								<div className="form--item">
									<input
										type="text"
										placeholder="Name"
										name="name"
										value={name}
										onChange={handleChange}
									/>
								</div>
							</>
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
