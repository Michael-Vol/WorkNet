import React from 'react';
import { Row, Col } from 'rsuite';
import './Message.scss';
const Message = ({ mine }) => {
	const mineClass = mine ? 'my-message' : 'friends--message';
	return (
		<Row className={`message ${mineClass} clearfix`}>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, nam?
			<br />
		</Row>
	);
};

export default Message;
