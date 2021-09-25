import React from 'react';
import { Row, Col } from 'rsuite';
import './Message.scss';
import Moment from 'react-moment';
const Message = ({ message, mine }) => {
	const mineClass = mine ? 'my-message' : 'friends--message';
	return (
		<div className={`${mineClass} clearfix`}>
			<div className={`message--timestamp--${mineClass}`}>
				<Moment format='HH:mm'>{message.timestamp}</Moment>
			</div>
			<Row className={`message message--body--${mineClass}`}>{message.message}</Row>
		</div>
	);
};

export default Message;
