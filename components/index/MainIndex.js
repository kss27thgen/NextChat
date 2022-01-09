import React, { useEffect, useState } from "react";

const initialCurrentRoom = {
	messages: [],
	roomname: "",
};

const MainIndex = ({ rooms }) => {
	const [currentRoom, setCurrentRoom] = useState(initialCurrentRoom);
	const { roomname, messages } = currentRoom;

	useEffect(() => {
		if (rooms[1]) {
			setCurrentRoom(rooms[1]);
		}
	}, [rooms]);

	return (
		<>
			<main className="indexMain">
				<div className="indexMain--top">
					<h3>{roomname}</h3>
				</div>

				<div className="messageList">
					{messages.length === 0 ? (
						<div>Loading Messages...</div>
					) : (
						messages.map((message) => (
							<div key={message.id}>{message.text}</div>
						))
					)}
				</div>
			</main>
		</>
	);
};

export default MainIndex;
