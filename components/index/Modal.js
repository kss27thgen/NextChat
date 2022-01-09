import React, { useState } from "react";

const Modal = ({ onModal, setOnModal }) => {
	return (
		<>
			<div className="modal">
				<>
					<div
						className={`${onModal ? "on" : "off"} modal--overlay`}
						onClick={() => setOnModal(!onModal)}
					></div>
					<div className={`${onModal ? "on" : "off"} modal--body`}>
						<h3>Modal Body</h3>
					</div>
				</>
			</div>
		</>
	);
};

export default Modal;
