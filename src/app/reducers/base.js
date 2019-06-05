import {
	FETCH_LOCALE_SUCCESS,
	FETCH_LOCALE_FAILED
} from '../actions/base';

const INITIAL_STATE = {
	language: {
		locale: 'zh',
		messages: null
	}
};

export default function app(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_LOCALE_SUCCESS: {
			return { ...state, language: action.payload };
		}
		case FETCH_LOCALE_FAILED:
			return { ...state, language: action.payload };
		default:
			return state;
	}
}