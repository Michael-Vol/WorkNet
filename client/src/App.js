import React, { useEffect } from 'react';
import 'rsuite/lib/styles/index.less';
import Landing from './Components/Layout/Landing';
import NavBar from './Components/Layout/NavBar';
import Register from './Components/auth/Register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Header, Content, Footer, Sidebar, Button } from 'rsuite';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store';
import './App.scss';

const App = (props) => {
	axios.defaults.baseURL = 'http://localhost:5000';
	return (
		<div>
			<Provider store={store}>
				<Router>
					<Container>
						<Header>
							<NavBar />
						</Header>
						<Container>
							<Route exact path='/' component={Landing} />
							<Switch>
								<Route exact path='/register' component={Register} />
							</Switch>
						</Container>
					</Container>
				</Router>
			</Provider>
		</div>
	);
};

App.propTypes = {};

export default App;
