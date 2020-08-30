// css
import './scss/index.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReduxIntlProvider from './app/ReduxIntlProvider';
import App from './app/App';

const render = Component => {
	ReactDOM.render(
		<ReduxIntlProvider>
			<AppContainer>
				<Component />
			</AppContainer>
		</ReduxIntlProvider>,
		document.getElementById('app')
	);
};

render(App);
if (module.hot) {
	module.hot.accept('./app/App', () => {
		render(App);
	});
}
