import { Provider, connect } from 'react-redux';
import React, { useEffect } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import { changeLang } from './actions/base';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

addLocaleData([...en, ...zh]);

const ReduxIntlProvider = ({ children, store, language, changeLang }) => {
	useEffect(() => {
		let lang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
		lang = lang.toLowerCase();
		lang = lang.split('-')[0] || 'en';
		changeLang(lang);
	}, []);
	// console.info('變動', language);
	if (language && language.messages) {
		return (
			<Provider store={store}>
				<IntlProvider locale={language.locale} messages={language.messages}>
					{children}
				</IntlProvider>
			</Provider>
		);
	} else {
		return false;
	}
};

const mapStateToProps = (state) => {
	const { language } = state.app;
	return { language };
};

export default connect(
	mapStateToProps, { changeLang }
)(ReduxIntlProvider);


// let needUpdate = false;

// class ReduxIntlProvider extends Component {

// 	UNSAFE_componentWillMount() {
// 		const { changeLang } = this.props;
// 		let lang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
// 		lang = lang.toLowerCase();
// 		lang = lang.split('-')[0] || 'en';
// 		changeLang && changeLang(lang);
// 	}
// 	UNSAFE_componentWillReceiveProps(nextProps) {
// 		const { language } = this.props;
// 		if (language !== nextProps.language) {
// 			needUpdate = true;
// 			console.info('新職');
// 		}
// 	}

// 	componentDidUpdate() {
// 		console.info('即將強迫更新');
// 		if (needUpdate) {
// 			console.info('強迫更新');
// 			needUpdate = false;
// 			this.forceUpdate();
// 		}
// 	}

// 	render() {
// 		const { children, store, language } = this.props;
// 		console.info('來了', language);
// 		if (language && language.locale) {
// 			return (
// 				<Provider store={store}>
// 					<IntlProvider locale={language.locale} messages={language.messages}>
// 						{children}
// 					</IntlProvider>
// 				</Provider>
// 			);
// 		} else {
// 			return false;
// 		}
// 	}
// }