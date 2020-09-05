import axios from 'axios';
import services from '../config/services';

export const FETCH_LOCALE_SUCCESS = 'FETCH_LOCALE_SUCCESS';
export const FETCH_LOCALE_FAILED = 'FETCH_LOCALE_FAILED';

/* 變更語系 */
export const changeLang = (locale, dispatch) => {
	axios
		.get(`${services.getLocale}/${locale}.json`)
		.then(response => {
			dispatch({
				type: FETCH_LOCALE_SUCCESS,
				payload: { locale, messages: response.data },
			});
		})
		.catch(() => {
			/* 語系取得失敗時使用英文 */
			axios.get(`${services.getLocale}/en.json`).then(response => {
				dispatch({
					type: FETCH_LOCALE_SUCCESS,
					payload: { locale: 'en', messages: response.data },
				});
			});
		});
};
