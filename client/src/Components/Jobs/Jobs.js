import React, { useState, useEffect, useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import './Jobs.scss';
import {
	FlexboxGrid,
	Divider,
	Modal,
	Panel,
	Row,
	Button,
	Form,
	FormGroup,
	Schema,
	Tag,
	HelpBlock,
	ControlLabel,
	FormControl,
} from 'rsuite';
import JobItem from './JobItem';
import { getJobs, addJob } from '../../Actions/jobs';
import { useDispatch, useSelector } from 'react-redux';
const Jobs = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const jobs = useSelector((state) => state.jobs.jobs);
	const updatedApplicants = useSelector((state) => state.jobs.updatedApplicants);

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

	useEffect(() => {
		if (user) {
			fetchJobs();
		}
	}, [user]);

	useEffect(() => {
		fetchJobs();
	}, [updatedApplicants]);

	const { StringType } = Schema.Types;
	const model = Schema.Model({
		title: StringType().isRequired('This field is required'),
		body: StringType().isRequired('This field is required'),
		keywords: StringType().isRequired('This field is required'),
	});
	const handleSubmit = async () => {
		if (!formRef.current.check()) {
			return toast.error('Cannot Submit Form. Check your fields and submit again.');
		}
		formData.keywords = formData.keywords.split(',');
		console.log(formData.keywords);
		console.log(formData);
		const res = await addJob(formData);
		dispatch(res);

		setAddPostOpened(false);
		toast.success('Job Post Submitted!');
		await fetchJobs();
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
								{typeof formData.keywords === 'string' &&
									formData.keywords &&
									formData.keywords.split(',').map((keyword, index) => {
										if (keyword !== '') {
											return (
												<Tag className='form--keyword--tag' key={index}>
													{keyword}
												</Tag>
											);
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
