/* eslint-disable react/jsx-props-no-spreading */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './scss/index.scss';

import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import IndexProvider from './app/IndexProvider';
import App from './app/App';
import services from './app/config/services';

const render = Component => {
	ReactDOM.render(
		<BrowserRouter basename={services.getContextRoot}>
			<Switch>
				<Route
					path="/:locale?" // ? => unnecessary
					render={props => (
						<IndexProvider {...props}>
							<Component />
						</IndexProvider>
					)}
				/>
			</Switch>
		</BrowserRouter>,
		document.getElementById('app')
	);
};

render(App);
if (module.hot) {
	module.hot.accept('./app/App', () => {
		render(App);
	});
}
