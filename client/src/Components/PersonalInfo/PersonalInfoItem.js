import React from 'react';
import { Panel, List, Placeholder } from 'rsuite';
import { useSelector } from 'react-redux';
import './PersonalInfoItem.scss';
const PersonalInfoItem = ({ category, infoData }) => {
	const loading = useSelector((state) => state.personalInfo.loading);

	return (
		<Panel header={category} shaded className='info--panel' collapsi>
			{loading ? (
				<Placeholder.Paragraph active />
			) : (
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
			)}
		</Panel>
	);
};

export default PersonalInfoItem;
