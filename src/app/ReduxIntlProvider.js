'use strict';
import { Provider, connect } from 'react-redux';
import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import { changeLang } from './actions/base';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

addLocaleData([...en, ...zh]);
class ReduxIntlProvider extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const { changeLang } = this.props;
		const  browserLang = this.getBrowserLang();
		changeLang( browserLang );
	}
	
	getBrowserLang(){
		let lang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
		lang = lang.toLowerCase();
		lang = lang.split('-')[0] || 'en';
		return lang;
	}

	render() {
		const { children, store, lang, locale } = this.props;

		if(!locale){
			return false;
		}
		return (
			<Provider store={ store }>
				<IntlProvider locale={ lang } messages={ locale }>
					{ children }
				</IntlProvider>
			</Provider>
		);
	}
}

const mapStateToProps = ( state ) => {
	const { lang, locale } = state.app;
	return { lang, locale };
};

export default connect(
	mapStateToProps, { changeLang }
)(ReduxIntlProvider);
