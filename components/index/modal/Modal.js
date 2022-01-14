import React, { useContext } from "react";
import ModalContext from "../../../context/modal/ModalContext";
import CreateRoomModal from "../../index/modal/createRoomModal";

const Modal = () => {
	const modalContext = useContext(ModalContext);
	const { modalType, modalOff, modalStatus, setModalType } = modalContext;

	const displayModalContent = (modalType) => {
		switch (modalType) {
			case "createRoom":
			case "editRoom":
				return <CreateRoomModal />;
				break;
			case "":
				return (
					<div
						style={{
							height: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<img
							src="/loading-trans.jpeg"
							alt="loading"
							style={{ width: "5rem" }}
						/>
					</div>
				);
				break;
			default:
				break;
		}
	};

	return (
		<>
			<div className="modal">
				<>
					<div
						className={`${
							modalStatus ? "on" : "off"
						} modal--overlay`}
						onClick={() => {
							setModalType("");
							modalOff();
						}}
					></div>
					<div
						className={`${modalStatus ? "on" : "off"} modal--body`}
					>
						{displayModalContent(modalType)}
					</div>
				</>
			</div>
		</>
	);
};

export default Modal;
