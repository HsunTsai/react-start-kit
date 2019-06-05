'use strict';

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';
import { connect } from 'react-redux';
import classNames from 'classnames';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
		};
	}

	render() {
		const { active } = this.state;
		return (
			<div className='home'>
				<div className={classNames('home__title', { 'home__title--active': active })}>
					Home Page
				</div>
				<FormattedMessage id='superHello' values={{ someoneName: 'Hsun.Tsai' }} />
				<Button className='home__btn' type="primary" onClick={() => this.setState({ active: !active })}>
					{`Home Title ${active ? 'inActive' : 'Active'}`}
				</Button>
			</div>
		);
	}
}

export default connect()(Home);