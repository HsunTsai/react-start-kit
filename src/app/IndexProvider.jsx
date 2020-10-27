import React, { useEffect, useState } from 'react';
import { createStore, applyMiddleware } from 'redux';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import rootReducer from './reducers/index';
import Loading from './components/loading/Loading';
import services from './config/services';
import { changeLang, supportLanguages } from './actions/app';

const store = createStore(rootReducer, applyMiddleware(thunk));

const IndexProvider = ({ match, history, children }) => {
	const [i18n, setI18n] = useState();
	const {
		params: { locale },
	} = match;

	useEffect(() => {
		/* 檢查 語系最常不會超過9字元 => https://github.com/ladjs/i18n-locales
		 * 檢查 本系統是否支援該語系 */
		if (locale && locale.length < 9 && supportLanguages.some(({ value }) => value === locale)) {
			axios
				.get(`${services.getLocale}/${locale}.json`)
				.then(response => setI18n({ locale, messages: response.data }))
				/* 語系取得失敗時使用英文 */
				.catch(() => {
					axios
						.get(`${services.getLocale}/en.json`)
						.then(response => setI18n({ locale: 'en', messages: response.data }));
				});
		} else {
			/* URL沒有語系 自動將語系帶上 */
			changeLang({ history });
		}
	}, [locale]);

	return i18n ? (
		<Provider store={store}>
			<IntlProvider locale={i18n.locale} messages={i18n.messages}>
				{children}
			</IntlProvider>
		</Provider>
	) : (
		<Loading />
	);
};

IndexProvider.defaultProps = {};

IndexProvider.propTypes = {
	match: PropTypes.objectOf(PropTypes.any).isRequired,
	history: PropTypes.objectOf(PropTypes.any).isRequired,
	children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IndexProvider;
