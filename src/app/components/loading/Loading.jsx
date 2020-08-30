import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './loading.scss';

const Loading = () => (
	<div className="loadingPage">
		<Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
	</div>
);

export default Loading;
