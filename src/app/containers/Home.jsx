'use strict';

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import classNames from 'classnames';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let btnClass = classNames({
			'home': true
		});
		
		return (
		<div className={btnClass}>
			Home
			<FormattedMessage id='superHello' values={{ someone: <b>'User'</b>}} />
		</div>
		);
	}
}

export default connect()(Home);