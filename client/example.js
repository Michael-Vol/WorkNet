import { FlexboxGrid } from "rsuite";

<div>
			<Container className='login--container'>
				<Toaster position='top-right' toastOptions={{ duration: 4000 }} />
				
                <Content>
                <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={12}>
                <Panel header={<h3>Login</h3>} bordered>
				<Form fluid
					ref={formRef}
					layout='horizontal'
					model={model}
					formValue={loginData}
					onChange={(value) => setLoginData(value)}
					onCheck={(formError) => setFormError(formError)}>
					<FormGroup key='form__email'>
						<ControlLabel className='form__label'>
							<i className='fas fa-envelope form__icon'></i>
							<span>Email</span>
						</ControlLabel>
						<FormControl name='email'></FormControl>
					</FormGroup>
                    <FormGroup key='form__password'>
                        <ControlLabel className='form__label'>
                            <i className='fas fa-key form__icon'></i>
                            <span>Password</span>
                        </ControlLabel>
                        <FormControl name='password'></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ButtonToolbar>
                            <Button
                                className='form--submit-btn'
                                type='submit'
                                onClick={() => handleSubmit()}
                                appearance='primary'>
                                Login
                            </Button>
                            <Button
                                className='form--cancel-btn'
                                appearance='default'
                                onClick={() => {
                                    return <Redirect to='/' />;
                                }}>
                                Cancel
                            </Button>
                        </ButtonToolbar>
                    </FormGroup>

                    </Panel>
                </FlexboxGrid.Item>
                </FlexboxGrid>
                </Content>                

				</Form>
			</Container>
		</div>
	);