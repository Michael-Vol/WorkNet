import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, FlexboxGrid, Table, Checkbox, Avatar, Button, IconButton, Whisper, Dropdown, Popover } from 'rsuite';
import './AdminPanel.scss';
import { getUsers } from '../../Actions/users';
import { getAvatar } from '../../Actions/posts';
import { useDispatch } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import exportFromJSON from 'export-from-json';

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => {
	return (
		<Table.Cell {...props}>
			<Checkbox
				inline
				checked={checkedKeys.some((item) => item === rowData[dataKey])}
				onChange={onChange}
				value={rowData[dataKey]}
			/>
		</Table.Cell>
	);
};
const ProfileCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => {
	return (
		<Table.Cell {...props} className='profile--cell'>
			<Link className='profile--link' to={`/users/${rowData[dataKey]}/profile`}>
				Visit Profile
			</Link>
		</Table.Cell>
	);
};

const ImageCell = ({ rowData, dataKey, ...props }) => {
	const [avatar, setAvatar] = useState(null);
	const dispatch = useDispatch();

	const fetchAvatar = async (id) => {
		const res = await getAvatar(id);
		setAvatar(res.payload.avatar);
	};
	useEffect(async () => {
		await fetchAvatar(rowData[dataKey]);
	}, []);
	return (
		<Table.Cell {...props}>
			<Avatar circle src={`data:image/png;base64,${avatar}`} />
		</Table.Cell>
	);
};
const ActionCell = ({ rowData, dataKey, users, checkedKeys, ...props }) => {
	const renderMenu = ({ onClose, left, top, className }, ref) => {
		const handleSelect = (eventKey) => {
			onClose();
			const data = users.filter((user) => checkedKeys.includes(user._id));
			if (data.length === 0) {
				return toast.error('Please select user(s) to export');
			}
			eventKey === 1
				? exportFromJSON({ data, fileName: 'users', exportType: 'xml' })
				: exportFromJSON({ data, fileName: 'users', exportType: 'json' });
			toast.success('Users Exported!');
		};
		return (
			<Popover ref={ref} className={className} style={{ left, top }} full>
				<Dropdown.Menu onSelect={handleSelect}>
					<Dropdown.Item eventKey={1}>
						<span className='dropdown--item'>Export XML</span>
					</Dropdown.Item>
					<Dropdown.Item eventKey={2}>
						<span className='dropdown--item'>Export JSON</span>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Popover>
		);
	};
	return (
		<Table.Cell {...props} className='link-group'>
			<Whisper placement='autoVerticalStart' trigger='click' speaker={renderMenu}>
				<IconButton appearance='subtle' icon={<i className='i fas fa-ellipsis-v'> </i>} />
			</Whisper>
		</Table.Cell>
	);
};

const AdminPanel = () => {
	const [users, setUsers] = useState(null);
	const [usersFetched, setUsersFetched] = useState(false);
	const [checkedKeys, setCheckedKeys] = useState([]);
	const dispatch = useDispatch();

	const fetchUsers = async () => {
		const res = await getUsers({ includePersonalInfo: true });
		dispatch(res);
		setUsers(res.payload.users);
		setUsersFetched(true);
	};

	const handleCheck = (value, checked) => {
		const keys = checked ? [...checkedKeys, value] : checkedKeys.filter((item) => item !== value);
		setCheckedKeys(keys);
	};

	const handleCheckAll = (value, checked) => {
		const keys = checked ? users.map((user) => user._id) : [];
		setCheckedKeys(keys);
	};

	useEffect(async () => {
		await fetchUsers();
	}, []);
	return (
		<FlexboxGrid className='admin--flex--panel--container'>
			<Toaster position='top-right' toastOptions={{ duration: 2000 }} />
			<FlexboxGrid.Item colspan={2}></FlexboxGrid.Item>
			<FlexboxGrid.Item colspan={20} className='admin--panel--container'>
				<Row className='panel--header--container'>
					<span>Administrator Panel</span>
				</Row>
				<Row className='header--divider'></Row>
				{usersFetched && (
					<Row className='table--container'>
						<Table hover height={620} data={users} rowHeight={70}>
							<Table.Column align='center'>
								<Table.HeaderCell>
									<Checkbox inline onChange={handleCheckAll} />
								</Table.HeaderCell>
								<CheckCell dataKey='_id' checkedKeys={checkedKeys} onChange={handleCheck} />
							</Table.Column>
							<Table.Column align='center' className='column'>
								<Table.HeaderCell>Avatar</Table.HeaderCell>
								<ImageCell dataKey='_id' />
							</Table.Column>
							<Table.Column align='center' key='firstName' width={150}>
								<Table.HeaderCell>First Name</Table.HeaderCell>
								<Table.Cell dataKey='firstName' />
							</Table.Column>
							<Table.Column align='center' key='lastName' width={250}>
								<Table.HeaderCell>Last Name</Table.HeaderCell>
								<Table.Cell dataKey='lastName' />
							</Table.Column>
							<Table.Column align='center' key='email' width={250}>
								<Table.HeaderCell>Email</Table.HeaderCell>
								<Table.Cell dataKey='email' />
							</Table.Column>
							<Table.Column align='center' key='phoneNumber' width={150}>
								<Table.HeaderCell>Phone Number</Table.HeaderCell>
								<Table.Cell dataKey='phoneNumber' />
							</Table.Column>
							<Table.Column align='center' key='profile' width={150}>
								<Table.HeaderCell>Profile</Table.HeaderCell>
								<ProfileCell dataKey='_id' />
							</Table.Column>
							<Table.Column align='center' key='action' width={150}>
								<Table.HeaderCell>Action</Table.HeaderCell>
								<ActionCell dataKey='_id' checkedKeys={checkedKeys} users={users} />
							</Table.Column>
						</Table>
					</Row>
				)}
			</FlexboxGrid.Item>
			<FlexboxGrid.Item colspan={2}></FlexboxGrid.Item>
		</FlexboxGrid>
	);
};

export default AdminPanel;
