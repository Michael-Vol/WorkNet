import React from 'react';
import PropTypes from 'prop-types';
import Landing from './Components/Layout/Landing';
import NavBar from './Components/Layout/NavBar';
import 'rsuite/dist/styles/rsuite-default.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Header, Content, Footer, Sidebar } from 'rsuite';

const App = (props) => {
	return (
		<div>
			<Router>
				<Container>
					<Header>
						<NavBar />
					</Header>
					<Container>
						<Route exacth path='/' component={Landing} />
					</Container>
				</Container>
			</Router>
		</div>
	);
};

App.propTypes = {};

export default App;
