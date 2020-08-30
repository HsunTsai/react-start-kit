import React from 'react';
import { Avatar } from 'antd';

const About = () => (
	<div className="about">
		<div className="about__title">About Page</div>
		<div className="about__avatar">
			<Avatar className="about__avatar-item" icon="user" />
			<Avatar className="about__avatar-item">U</Avatar>
			<Avatar className="about__avatar-item">USER</Avatar>
			<Avatar
				className="about__avatar-item"
				src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
			/>
			<Avatar className="about__avatar-item" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
				U
			</Avatar>
			<Avatar className="about__avatar-item" style={{ backgroundColor: '#87d068' }} icon="user" />
		</div>
	</div>
);

export default About;
