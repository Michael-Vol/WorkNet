<Form onSubmit={(e) => onSubmit(e)}>
	<FormGroup>
		<ControlLabel>Full Name</ControlLabel>
		<FormControl name='name' type='name'></FormControl>
		<HelpBlock>Required</HelpBlock>
	</FormGroup>

	<FormGroup>
		<ControlLabel>Email</ControlLabel>
		<FormControl name='email' type='email' />
		<HelpBlock>Required</HelpBlock>
	</FormGroup>

	<FormGroup>
		<ControlLabel>Password</ControlLabel>
		<FormControl name='password' type='password'></FormControl>
		<HelpBlock>Required</HelpBlock>
	</FormGroup>
	<FormGroup>
		<ControlLabel>Verify-Password</ControlLabel>
		<FormControl name='password2' type='password'></FormControl>
		<HelpBlock>Required</HelpBlock>
	</FormGroup>

	<FormGroup>
		<ControlLabel>Phone Number</ControlLabel>
		<FormControl name='phone' type='tel'></FormControl>
		<HelpBlock>Required</HelpBlock>
	</FormGroup>

	<FormGroup>
		<ControlLabel>Profile Photo</ControlLabel>
		<Uploader multiple listType='picture' action=''>
			<button>
				<Icon icon='camera-retro' size='lg' />
			</button>
		</Uploader>
	</FormGroup>

	<FormGroup>
		<ButtonToolbar>
			<Button className='form--submit-btn' appearance='primary'>
				Submit
			</Button>
			<Button className='form--submit-btn' appearance='default'>
				Cancel
			</Button>
		</ButtonToolbar>
	</FormGroup>
</Form>;
