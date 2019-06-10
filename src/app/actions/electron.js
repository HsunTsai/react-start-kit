/**
 * Electron App action
 * Electron動作窗口
 */

import { ipcRenderer } from 'electron';
import { openNotificationWithIcon } from './notification';
import { getI18n } from '../ReduxIntlProvider';

/* 檢查APP更新 */
export const checkUpdate = () => {
	console.info('checkUpdate');
	ipcRenderer.send('asynchronous-react-message', {
		case: 'checkUpdate',
	});
	// openNotificationWithIcon(
	// 	'info',
	// 	'準備檢查更新',
	// 	'檢查APP更新中...'
	// );
};

/* 開啟/關閉開發者套件 */
export const openDevTool = () => {
	console.info('open/close dev tool');
	ipcRenderer.send('asynchronous-react-message', {
		case: 'openDevTool',
	});
};

/* 測試React=>Electron MessageBox */
export const showNotificationBox = () => {
	console.info('showNotificationBox');
	ipcRenderer.send('asynchronous-react-message', {
		case: 'showNotificationBox',
	});
};

/* 建立Electron全域監聽 */
export const addEcectronListener = (store) => {
	ipcRenderer.on('asynchronous-electron-message', (event, arg) => {
		if (arg && arg.type) {
			console.info(arg.type);
			switch (arg.type) {
				case 'onShowNotificationBox':
					openNotificationWithIcon(
						'success',
						getI18n()['common_succeed'],
						getI18n()['common_succeed_detail']
					);
					break;
				case 'getCandidateListSucceed':
					store.dispatch({
						type: 'TEST',
						payload: JSON.parse(arg.data),
					});
					break;
				default:
					console.info(
						'electron return message cannot mapping',
						arg.type
					);
			}
		} else {
			openNotificationWithIcon(
				'error',
				'electron pass message error',
				arg
			);
		}
	});
};
