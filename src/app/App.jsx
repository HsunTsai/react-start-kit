import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, Redirect } from 'react-router-dom';
/* You can cache page when page cahnge by import CacheRoute & CacheSwitch */
// import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import Loadable from 'react-loadable';

import Header from './components/header/Header';
import RouterLoading from './components/loading/Loading';

const pages = [
	{
		path: '/home',
		name: 'Home',
		component: Loadable({ loader: () => import('./containers/Home'), loading: RouterLoading }),
	},
	{
		path: '/about',
		name: 'About',
		component: Loadable({ loader: () => import('./containers/About'), loading: RouterLoading }),
	},
	{
		path: '/topic',
		name: 'Topic',
		component: Loadable({ loader: () => import('./containers/Topic'), loading: RouterLoading }),
	},
];

const App = () => (
	<div className="app">
		<Header pages={pages} />
		<Switch>
			{pages.map((page, index) => (
				<Route key={index.toString()} exact path={`/:locale${page.path}`} component={page.component} />
			))}
			<Redirect to={pages[0].path} />
		</Switch>
	</div>
);

export default hot(App);
