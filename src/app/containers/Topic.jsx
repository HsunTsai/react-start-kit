import React, { useState } from 'react';
import { Button, Checkbox, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const options = [
	{ label: '按起來', value: 'Click' },
	{ label: '跳起來', value: 'Jump' },
	{ label: '飛起來', value: 'Fly' },
];

const Topic = () => {
	const [clickOption, setClickOption] = useState(['Click']);
	const [selectDate, setSelectDate] = useState('Empty');

	return (
		<div className="topic">
			<div className="topic__title">{`Topic Page (${JSON.stringify(clickOption)})`}</div>
			<div className="topic__block">
				<Checkbox.Group options={options} defaultValue={['Click']} onChange={type => setClickOption(type)} />
			</div>

			<div className="topic__block">{selectDate}</div>
			<div className="topic__block">
				<RangePicker onChange={dateString => setSelectDate(JSON.stringify(dateString))} />
			</div>
			<div className="topic__block">
				<Button type="primary" onClick={() => history.push({ pathname: './about' })}>
					Go to About Page
				</Button>
			</div>
		</div>
	);
};

export default Topic;
