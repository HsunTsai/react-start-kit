//css
import './scss/normalize.css';
import './scss/index.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './app/reducers';
import ReduxIntlProvider from './app/ReduxIntlProvider';
import App from './app/App';

const store = createStore(
	rootReducer,
	applyMiddleware(thunk)
);

const render = Component => {
	ReactDOM.render(
		<ReduxIntlProvider store={store}>
			<AppContainer>
				<Component />
			</AppContainer>
		</ReduxIntlProvider>,
		document.getElementById('app')
	);
};

render(App);
//HMR for react
if (module.hot) {
	module.hot.accept('./app/App', () => { render(App); });
}


