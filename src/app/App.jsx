'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';

import { changeLang } from './actions/base';
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
		const { onChangeLanguage,  } = this.props;
		return (
			<Router>
				<div>
					<ul className="nav">
						<img src="images/test_logo.png" height="47" width="115" alt="Image Error"/>
						<li><NavLink exact to="/" activeClassName='nav__link--active'>Home</NavLink></li>
						<li><NavLink to="/about" activeClassName='nav__link--active'>About</NavLink></li>
						<li><NavLink to="/topics" activeClassName='nav__link--active'>Topics</NavLink></li>
					</ul>
					
					<hr/>
					
					<button onClick={ ()=>onChangeLanguage('en') }>en_US</button>
					<button onClick={ ()=>onChangeLanguage('zh') }>zh-Hans</button>

					<hr/>

					<Route exact path="/" component={Home}/>
					<Route path="/about" component={About}/>
					<Route path="/topics" component={Topics}/>
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