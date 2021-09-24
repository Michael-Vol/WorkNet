import React, { useEffect } from 'react';
import 'rsuite/lib/styles/index.less';
import Landing from './Components/Layout/Landing';
import NavBar from './Components/Layout/NavBar';
import Register from './Components/auth/Register';
import Login from './Components/auth/Login';
import Settings from './Components/Settings/Settings';
import Dashboard from './Components/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Header } from 'rsuite';
import axios from 'axios';
import { loadUser } from './Actions/auth';
import PrivateRoute from './Components/Routing/PrivateRoute';
import PersonalInfo from './Components/PersonalInfo/PersonalInfo';
import Network from './Components/Network/Network';
import Profile from './Components/Profile/Profile';
import Jobs from './Components/Jobs/Jobs';
import Chats from './Components/Chats/Chats';
import { useDispatch } from 'react-redux';
import './App.scss';

const App = (props) => {
	axios.defaults.baseURL = 'http://localhost:5000';
	const dispatch = useDispatch();
	useEffect(async () => {
		const res = await loadUser();
		dispatch(res);
	}, []);
	return (
		<Router>
			<Container className='app-container'>
				<Header>
					<NavBar />
				</Header>
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
					<PrivateRoute exact path='/dashboard' component={Dashboard} />
					<PrivateRoute exact path='/personal-info' component={PersonalInfo} />
					<PrivateRoute exact path='/settings' component={Settings} />
					<PrivateRoute exact path='/network' component={Network} />
					<PrivateRoute exact path='/users/:user_id/profile' component={Profile} />
					<PrivateRoute exact path='/jobs' component={Jobs} />
					<PrivateRoute exact path='/chats' component={Chats} />
				</Switch>
			</Container>
		</Router>
	);
};

App.propTypes = {};

export default App;
