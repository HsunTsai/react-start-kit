import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';
import classNames from 'classnames';

const Home = () => {
	const [active, setActive] = useState(false);

	return (
		<div className="home">
			<div
				className={classNames('home__title', {
					'home__title--active': active,
				})}
			>
				Home Page
			</div>
			<FormattedMessage
				id="superHello"
				values={{ someoneName: 'Hsun.Tsai' }}
			/>
			<Button
				className="home__btn"
				type="primary"
				onClick={() => setActive(!active)}
			>
				{`Home Title ${active ? 'inActive' : 'Active'}`}
			</Button>
		</div>
	);
};

export default Home;
