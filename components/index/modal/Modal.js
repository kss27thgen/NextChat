import React, { useContext, useState } from "react";
import ModalContext from "../../../context/modal/ModalContext";
import CreateRoomModal from "../../index/modal/createRoomModal";

const Modal = ({ onModal, setOnModal }) => {
	const modalContext = useContext(ModalContext);
	const { modalType } = modalContext;

	const displayModalContent = (modalType) => {
		switch (modalType) {
			case "createRoom":
				return <CreateRoomModal />;
				break;
			case "test":
				return <div>TEST</div>;
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
						className={`${onModal ? "on" : "off"} modal--overlay`}
						onClick={() => setOnModal(!onModal)}
					></div>
					<div className={`${onModal ? "on" : "off"} modal--body`}>
						{displayModalContent(modalType)}
					</div>
				</>
			</div>
		</>
	);
};

export default Modal;
