/**
 * notification action
 * Ant design 通知動作
 */

import { notification } from 'antd';

/* 通知(含圖片) */
export const openNotificationWithIcon = (type, message, description) => {
	notification.config({
		placement: 'bottomLeft',
		duration: 2,
	});
	notification[type]({
		message,
		description,
	});
};