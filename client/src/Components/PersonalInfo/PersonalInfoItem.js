import React from 'react';
import { Panel, FlexboxGrid } from 'rsuite';
import './PersonalInfoItem.scss';
const PersonalInfoItem = ({ headerName, text, rest }) => {
	return (
		<FlexboxGrid.Item>
			<Panel {...rest} shaded header={headerName} className='info-item'>
				<p>{text}</p>
			</Panel>
		</FlexboxGrid.Item>
	);
};

export default PersonalInfoItem;
