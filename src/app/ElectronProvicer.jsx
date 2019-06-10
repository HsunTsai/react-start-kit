import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { addEcectronListener, openDevTool } from './actions/electron';

const ElectronProvider = ({ children, store }) => {
	useEffect(() => {
		//加入Electron callback監聽
		addEcectronListener(store);

		//加入F5 F12特定指定與Electron溝通
		document.addEventListener('keydown', e => {
			const { location } = window;
			const isAppDev = process.env.NODE_ENV === 'development';
			// console.info('keydown', e.which);
			if (e.which === 115) {
				// F4
				console.info(location);
			} else if (e.which === 116) {
				// F5
				console.info('start reload');
				if (isAppDev) {
					location.reload();
				} else {
					location.hash = '/';
				}
			} else if (e.which === 123) {
				// F12
				openDevTool();
			}
		});
	}, []);
	return children;
};

const mapStateToProps = (state) => {
	const { language } = state.app;
	return { language };
};

export default connect(
	mapStateToProps, { addEcectronListener }
)(ElectronProvider);