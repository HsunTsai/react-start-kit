'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import 'antd/dist/antd.css';

import services from './config/services';
import AsyncBundle from './components/AsyncBundle';
import Header from './components/Header';

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
		this.handleLanguageChange = this.handleLanguageChange.bind(this);
	}

	handleLanguageChange(lang) {
		// console.log(lang);
		const { onChangeLanguage } = this.props;
		onChangeLanguage(lang);
	}


	UNSAFE_componentWillReceiveProps(nextProps) {
		const { language } = this.props;
		if (language !== nextProps.language) {
			setTimeout(() => {
				this.forceUpdate();
			}, 3000);
		}
	}

	render() {
		const pages = [
			{ path: '/home', name: 'Home', component: Home },
			{ path: '/about', name: 'About', component: About },
			{ path: '/topic', name: 'Topic', component: Topics },
		];
		return (
			<Router basename={services.getContextRoot}>
				<div className='app'>
					<Header pages={pages} />
					<Switch>
						{pages.map((page, index) =>
							<Route
								exact={index == 0}
								key={index}
								path={page.path}
								component={page.component} />)}
						<Redirect to={pages[0].path} />
					</Switch>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
	const { language } = state.app;
	return { language };
};

export default connect(mapStateToProps)(App);