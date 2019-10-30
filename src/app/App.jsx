import React, { lazy, Suspense } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import 'antd/dist/antd.css';

import services from './config/services';
import Header from './components/Header';

// LazyLoader
const HomeComponent = lazy(() => import('./containers/Home'));
const AboutComponent = lazy(() => import('./containers/About'));
const TopicsComponent = lazy(() => import('./containers/Topics'));

const LoadingMessage = () => 'Loading...';

const App = () => {
	const pages = [
		{ path: '/home', name: 'Home', component: <HomeComponent /> },
		{ path: '/about', name: 'About', component: <AboutComponent /> },
		{ path: '/topic', name: 'Topic', component: <TopicsComponent /> },
	];
	return (
		<Router basename={services.getContextRoot}>
			<div className="app">
				<Header pages={pages} />
				<Suspense fallback={<LoadingMessage />}>
					<Switch>
						{pages.map((page, index) => (
							<Route
								key={index.toString()}
								exact={index === 0}
								path={page.path}
							>
								{page.component}
							</Route>
						))}
						<Redirect to={pages[0].path} />
					</Switch>
				</Suspense>
			</div>
		</Router>
	);
};

// App.defaultProps = {
// 	language: null,
// };

// App.propTypes = {
// 	language: PropTypes.objectOf(PropTypes.any),
// };

// const mapStateToProps = state => {
// 	const { language } = state.app;
// 	return { language };
// };

// export default connect(mapStateToProps)(App);

export default App;

// UNSAFE_componentWillReceiveProps(nextProps) {
// 	const { language } = this.props;
// 	if (language !== nextProps.language) {
// 		setTimeout(() => {
// 			this.forceUpdate();
// 		}, 3000);
// 	}
// }
