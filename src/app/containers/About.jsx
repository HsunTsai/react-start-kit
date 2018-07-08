'use strict';

import React, { Component } from 'react';
import MyButton from '../components/MyButton';

class About extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<MyButton />
				About
			</div>
		);
	}
}

export default About;
