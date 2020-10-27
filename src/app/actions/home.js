import { openNotificationWithIcon } from '../utils/notification';

export const COUNT_CHANGE = 'COUNT_CHANGE';

export const countUp = count => dispatch => {
	if (count < 5) {
		dispatch({
			type: COUNT_CHANGE,
			payload: { count: count + 1 },
		});
	} else {
		openNotificationWithIcon('error', 'Stop', 'Count can not bigger than 5');
	}
};

export const countDown = count => dispatch => {
	if (count > 0) {
		dispatch({
			type: COUNT_CHANGE,
			payload: { count: count - 1 },
		});
	} else {
		openNotificationWithIcon('error', 'Stop', 'Count can not smaller than 0');
	}
};
