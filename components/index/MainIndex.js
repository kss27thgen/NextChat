import React, { useEffect, useState } from "react";
import { useContext } from "react/cjs/react.development";
import RoomContext from "../../context/room/RoomContext";

const MainIndex = ({ rooms }) => {
	const roomContext = useContext(RoomContext);
	const { currentRoom } = roomContext;

	const { roomname, messages } = currentRoom;

	return (
		<>
			<main className="indexMain">
				<div className="indexMain--top">
					<h3>{roomname ? roomname : "Hello, my friend"}</h3>
				</div>

				<div className="messageList">
					{messages.length > 0 &&
						messages.map((message) => (
							<div key={message.id}>{message.text}</div>
						))}
				</div>
			</main>
		</>
	);
};

export default MainIndex;
