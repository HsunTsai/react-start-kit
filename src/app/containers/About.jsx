import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Avatar, Button } from 'antd';
import { checkUpdate, showNotificationBox } from '../actions/electron';

class About extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { i18n } = this.props;
		return (
			<div className='about'>
				<div className='about__title'>About Page</div>
				<div className='about__avatar'>
					<Avatar className='about__avatar-item' icon="user" />
					<Avatar className='about__avatar-item'>U</Avatar>
					<Avatar className='about__avatar-item'>USER</Avatar>
					<Avatar className='about__avatar-item' src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
					<Avatar className='about__avatar-item' style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
					<Avatar className='about__avatar-item' style={{ backgroundColor: '#87d068' }} icon="user" />
				</div>
				<div className='about__block'>
					<Button type="primary" onClick={() => checkUpdate()}>
						{`${i18n['checkUpdate']} (Redux i18n)`}
					</Button>
				</div>
				<div className='about__block'>
					<Button type="primary" onClick={() => checkUpdate()}>
						<FormattedMessage id='checkUpdate' /> (FormattedMessage)
					</Button>
				</div>
				<div className='about__block'>
					<Button type="primary" onClick={() => showNotificationBox()}>
						Show NotificationBox
					</Button>
				</div>
			</div>
		);
	}
}
About.defaultProps = {
	i18n: {}
};

const mapStateToProps = state => {
	const { language } = state.app || {},
		i18n = language && language.messages;
	return { i18n };
};

export default connect(mapStateToProps, { checkUpdate, showNotificationBox })(About);
