import React from 'react';
import { Panel, FlexboxGrid, Col } from 'rsuite';
import './PersonalInfoItem.scss';
const PersonalInfoItem = ({ headerName, text, rest }) => {
	return (
		<Col md={6} sm={12}>
			<Panel {...rest} shaded header={headerName} className='info-item' defaultExpanded>
				<p>{text}</p>
			</Panel>
		</Col>
	);
};

export default PersonalInfoItem;
