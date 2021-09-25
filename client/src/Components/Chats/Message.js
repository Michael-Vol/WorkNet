import React from 'react';
import { Row, Col } from 'rsuite';
import './Message.scss';
const Message = ({ message, mine }) => {
	const mineClass = mine ? 'my-message' : 'friends--message';
	return <Row className={`message ${mineClass} clearfix`}>{message.message}</Row>;
};

export default Message;
