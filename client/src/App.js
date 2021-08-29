import React, { useEffect } from 'react';
import 'rsuite/lib/styles/index.less';
import Landing from './Components/Layout/Landing';
import NavBar from './Components/Layout/NavBar';
import Register from './Components/auth/Register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Header, Content, Footer, Sidebar, Button } from 'rsuite';

import './App.scss';

const App = (props) => {
	return (
		<div>
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
		</div>
	);
};

App.propTypes = {};

export default App;
