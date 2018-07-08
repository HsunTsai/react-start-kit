'use strict';

import React, { Component } from 'react';
import './myButton.scss';

export default class MyButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className="my-button">
				<h1>MyButton</h1>
				<span>
					<img src="" alt=""/>
					<img src="" alt=""/>
				</span>
			</div>
		);
	}
}

