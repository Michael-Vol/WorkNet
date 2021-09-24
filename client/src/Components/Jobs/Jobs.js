import React, { useState, useEffect, useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import './Jobs.scss';
import {
	FlexboxGrid,
	Divider,
	Modal,
	Panel,
	Row,
	Col,
	Button,
	Form,
	FormGroup,
	FormControl,
	ControlLabel,
	Schema,
	Tag,
	HelpBlock,
} from 'rsuite';
import JobItem from './JobItem';
import { getJobs } from '../../Actions/jobs';
import { useDispatch, useSelector } from 'react-redux';
const Jobs = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const jobs = useSelector((state) => state.jobs.jobs);
	const formRef = useRef();
	const [addPostOpened, setAddPostOpened] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		body: '',
		keywords: '',
	});
	const fetchJobs = async () => {
		const res = await getJobs();
		dispatch(res);
	};

	useEffect(async () => {
		if (user) {
			await fetchJobs();
		}
	}, [user]);
	const { StringType } = Schema.Types;
	const model = Schema.Model({
		title: StringType().isRequired('This field is required'),
		body: StringType().isRequired('This field is required'),
		keywords: StringType().isRequired('This field is required'),
	});
	const handleSubmit = async () => {
		if (!formRef.current.check()) {
			console.log('Cannot Submit Form');
			return toast.error('Cannot Submit Form. Check your fields and submit again.');
		}
		console.log(formData);
	};
	return (
		<FlexboxGrid className='jobs--flex--container'>
			<Toaster position='top-right' toastOptions={{ duration: 2000 }} />
			<FlexboxGrid.Item colspan={3}></FlexboxGrid.Item>
			<FlexboxGrid.Item colspan={18} className='jobs--container'>
				<Modal show={addPostOpened} onHide={() => setAddPostOpened(false)} className='add--job--modal'>
					<Modal.Header>
						<span className='modal--header'>Add a Job Post</span>
					</Modal.Header>
					<Modal.Body>
						<Form fluid model={model} ref={formRef} onChange={(value) => setFormData(value)}>
							<FormGroup key='form__title'>
								<ControlLabel className='form--control--label'>Title</ControlLabel>
								<FormControl name='title' />
							</FormGroup>
							<FormGroup key='keywords'>
								<ControlLabel className='form--control--label'>Keywords</ControlLabel>
								<FormControl name='keywords' />
								<HelpBlock className='keywords--helpblock'>Please separate keywords with comma(,)</HelpBlock>
								{formData.keywords &&
									formData.keywords.split(',').map((keyword) => {
										if (keyword !== '') {
											return <Tag className='form--keyword--tag'>{keyword}</Tag>;
										}
									})}
							</FormGroup>
							<FormGroup key='form__description'>
								<ControlLabel className='form--control--label'>Description</ControlLabel>
								<FormControl componentClass='textarea' name='body' />
							</FormGroup>
						</Form>
					</Modal.Body>
					<Modal.Footer className='modal--button--toolbar'>
						<Button
							className='submit--job--post'
							appearance='primary'
							onClick={() => {
								handleSubmit();
							}}>
							Submit
						</Button>
						<Button
							className='hide--add-job--container'
							onClick={() => {
								setAddPostOpened(false);
							}}>
							Cancel
						</Button>
					</Modal.Footer>
				</Modal>
				<div className='jobs--header'>
					Job Posts
					<Divider className='jobs--divider' />
				</div>
				<Row className='jobs--main--container'>
					<Row className='jobs--options--header'>
						<Button appearance='primary' className='add--post--btn' onClick={() => setAddPostOpened(true)}>
							Add Post
						</Button>
						<span className='jobs--counter'>{jobs ? jobs.length : 0} Jobs</span>
					</Row>
					<Panel className='jobs--posts--container'>
						{jobs &&
							jobs.map((job, index) => {
								return <JobItem key={index} job={job} />;
							})}
					</Panel>
				</Row>
			</FlexboxGrid.Item>
			<FlexboxGrid.Item colspan={3}></FlexboxGrid.Item>
		</FlexboxGrid>
	);
};

export default Jobs;
