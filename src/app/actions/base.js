import axios from 'axios';
import api from '../config/services';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const FETCH_LOCALE_SUCCESS = 'FETCH_LOCALE_SUCCESS';
export const FETCH_LOCALE_FAILED = 'FETCH_LOCALE_FAILED';

export function changeLang(lang) {
	return function(dispatch) {
		//start
		dispatch({
			type: CHANGE_LANGUAGE,
			payload: lang
		});

		axios.get(api.getLocale + `${lang}.json`)
			.then(response => {
				//success
				dispatch({
					type: FETCH_LOCALE_SUCCESS,
					payload: response.data
				});
			}).catch(error => {
				//failed
				dispatch({
					type: FETCH_LOCALE_FAILED,
					payload: error
				});
			});
	};
}