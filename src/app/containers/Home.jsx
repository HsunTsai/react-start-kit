import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Button } from 'antd';
import classNames from 'classnames';
import { countDown, countUp } from '../actions/home';

const Home = ({ count, actionCountUp, actionCountDown }) => {
	const [active, setActive] = useState(false);
	const { formatMessage } = useIntl();

	return (
		<div className="home">
			{/* Header */}
			<div className={classNames('home-box', 'home-box__header')}>
				<div className={classNames('home-box__header-title', { 'home-box__header-title--active': active })}>
					Home Page
				</div>
				<Button className="home-box__header-btn" type="primary" size="small" onClick={() => setActive(!active)}>
					{`Home Title ${active ? 'inActive' : 'Active'}`}
				</Button>
			</div>

			{/* Intl - two types formater for demo */}
			<div className={classNames('home-box', 'home-box__intl')}>
				<div className="home-box__intl-title">Intl Demo</div>
				<div>{`Type 1 [ <FormattedMessage id='xxx' values={{ xxx: 'xxx' }} /> ]`}</div>
				<FormattedMessage id="superHello" values={{ someoneName: 'Hsun.Tsai' }} />
				<div>{`Type 2 [ useIntl().formatMessage({ id='xxx' }, { xxx= 'xxx' }) ]`}</div>
				{formatMessage({ id: 'superHello' }, { someoneName: 'Hsun.Tsai' })}
			</div>

			<div className={classNames('home-box', 'home-box__redux')}>
				<div className="home-box__redux-title">{`Now Count ==> ${count}`}</div>
				<div>
					<Button style={{ marginRight: 8 }} onClick={() => actionCountUp(count)}>
						Count Up
					</Button>
					<Button onClick={() => actionCountDown(count)}>Count Down</Button>
				</div>
			</div>
		</div>
	);
};

Home.defaultProps = {
	count: 0,
};

Home.propTypes = {
	count: PropTypes.number,
	actionCountUp: PropTypes.func.isRequired,
	actionCountDown: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
	const { count } = state.home;
	return { count };
};

const mapDispatchToProps = dispatch => {
	return {
		actionCountUp: count => dispatch(countUp(count)),
		actionCountDown: count => dispatch(countDown(count)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
