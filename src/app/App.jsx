'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	BrowserRouter as Router,
	Route,
	NavLink,
	Switch,
	Redirect
} from 'react-router-dom';

import { changeLang } from './actions/base';
import services from './config/services';
import AsyncBundle from './components/AsyncBundle';
//Sync
import Home from './containers/Home';

//Async
import loadAbout from 'bundle-loader?lazy!./containers/About';
import loadTopics from 'bundle-loader?lazy!./containers/Topics';

//Async bundle
const About = () => (
	<AsyncBundle load={loadAbout}>
		{(About) => <About />}
	</AsyncBundle>
);

const Topics = () => (
	<AsyncBundle load={loadTopics}>
		{(Topics) => <Topics />}
	</AsyncBundle>
);

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { onChangeLanguage } = this.props,
			homePath = '/',
			abputPath = '/about',
			topicPath = '/topic';
		return (
			<Router basename={services.getContextRoot}>
				<div>
					<ul className="nav">
						<img src="../images/test_logo.png" height="47" width="115" alt="Image Error" />
						<li><NavLink to={homePath} activeClassName='nav__link--active'>Home</NavLink></li>
						<li><NavLink to={abputPath} activeClassName='nav__link--active'>About</NavLink></li>
						<li><NavLink to={topicPath} activeClassName='nav__link--active'>Topics</NavLink></li>
					</ul>

					<hr />

					<button onClick={() => onChangeLanguage('en')}>en_US</button>
					<button onClick={() => onChangeLanguage('zh')}>zh-Hans</button>

					<hr />
					<Switch>
						<Route path={homePath} component={Home} />
						<Route path={abputPath} component={About} />
						<Route path={topicPath} component={Topics} />
						<Redirect to={homePath} />
					</Switch>
				</div>
			</Router>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onChangeLanguage: (lang) => {
			dispatch(changeLang(lang));
		}
	};
};

export default connect(null, mapDispatchToProps)(App);