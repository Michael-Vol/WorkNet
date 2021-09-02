import React from 'react';
import { Panel, List } from 'rsuite';
import './PersonalInfoItem.scss';
const PersonalInfoItem = ({ category, infoData }) => {
	return (
		<Panel header={category} shaded className='info--panel'>
			<List hover className='info--list'>
				{infoData &&
					infoData.data &&
					infoData.data.map((info, index) => {
						return (
							<List.Item className='info--item' key={index}>
								<p className='info--item__title'>
									{infoData.name && <b>{infoData.name}:</b>} {info.name}
								</p>
								{info.description && (
									<p>
										<b>Description:</b> {info.description}
									</p>
								)}
							</List.Item>
						);
					})}
			</List>
		</Panel>
	);
};

export default PersonalInfoItem;
