import React, { useState, useEffect } from 'react';
import './LikeAvatarItem.scss';
import { getAvatar } from '../../Actions/posts';
import { Avatar } from 'rsuite';
const LikeAvatarItem = ({ userId }) => {
	const [avatar, setAvatar] = useState(null);

	const fetchAvatar = async () => {
		const res = await getAvatar(userId);
		setAvatar(res.payload.avatar);
	};
	useEffect(async () => {
		await fetchAvatar();
	}, []);
	return <Avatar circle className='like--avatar' src={`data:image/png;base64,${avatar}`} size='xs' />;
};

export default LikeAvatarItem;
