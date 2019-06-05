'use strict';

import React, { Component } from 'react';
import { Checkbox, DatePicker } from 'antd';

const { RangePicker } = DatePicker;


export default class Topics extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clickOption: ['Click'],
			selectDate: 'Empty'
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleRangePicker = this.handleRangePicker.bind(this);
	}

	handleClick(type) {
		this.setState({ clickOption: type });
	}

	handleRangePicker(date, dateString) {
		this.setState({ selectDate: JSON.stringify(dateString) });
	}

	render() {
		const { clickOption, selectDate } = this.state;
		const options = [
			{ label: '按起來', value: 'Click' },
			{ label: '跳起來', value: 'Jump' },
			{ label: '飛起來', value: 'Fly' },
		];
		return (
			<div className='topic'>
				<div className='topic__title'>
					{`Topic Page (${JSON.stringify(clickOption)})`}
				</div>
				<div className='topic__block'>
					<Checkbox.Group
						options={options}
						defaultValue={['Click']}
						onChange={this.handleClick} />
				</div>

				<div className='topic__block'>
					{selectDate}
				</div>
				<div className='topic__block'>
					<RangePicker onChange={this.handleRangePicker} />
				</div>
			</div>
		);
	}
}

