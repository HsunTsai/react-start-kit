import axios from 'axios';
import api from '../config/services';

export const FETCH_LOCALE_SUCCESS = 'FETCH_LOCALE_SUCCESS';
export const FETCH_LOCALE_FAILED = 'FETCH_LOCALE_FAILED';

export const changeLang = locale => dispatch => {
	axios.get(api.getLocale + `${locale}.json`)
		.then(response => {
			//success
			dispatch({
				type: FETCH_LOCALE_SUCCESS,
				payload: {
					locale, messages: response.data
				}
			});
		}).catch(error => {
			//failed
			dispatch({
				type: FETCH_LOCALE_FAILED,
				payload: error
			});
		});
};
