/* eslint-disable no-nested-ternary */
import { notification } from 'antd';

export const openNotificationWithIcon = (type, message, description, duration = 4) => {
	notification.config({
		placement: 'bottomLeft',
		duration,
	});
	notification[type]({
		message,
		description,
	});
};

// eslint-disable-next-line no-nested-ternary
export const openNotificationError = (type, message, error) => {
	notification.config({
		placement: 'bottomLeft',
		duration: 4,
	});

	const { statusText } = error.response;

	notification[type]({
		message,
		description:
			error && error.response // 檢查response是否存在
				? error.response.data // 檢查data是否存在
					? error.response.data.message // 檢查message是否存在
						? error.response.data.message
						: statusText
					: statusText
				: JSON.stringify(error.response),
	});
};
