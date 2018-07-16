import {
	CHANGE_LANGUAGE,
	FETCH_LOCALE_SUCCESS,
	FETCH_LOCALE_FAILED
} from '../actions/base';

const INITIAL_STATE = {
	lang: 'zh',
	locale: null
};

export default function app(state = INITIAL_STATE, action) {
	switch (action.type) {
		case CHANGE_LANGUAGE:
			return { ...state, lang: action.payload };
		case FETCH_LOCALE_SUCCESS:
			return { ...state, locale: action.payload };
		case FETCH_LOCALE_FAILED:
			return { ...state, locale: action.payload };
		default:
			return state;
	}
}