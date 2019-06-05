import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Select } from 'antd';
import { changeLang } from '../actions/base';

import ReactIcon from '../../images/react_logo.png';

const { Option } = Select;

const Header = ({ locale, pages, handleLanguageChange }) => (
	<div className='app__header'>
		<img className='app__header-icon' src={ReactIcon} />
		{pages.map((page, index) =>
			<NavLink key={index}
				to={page.path}
				className='app__header-item'
				activeClassName='app__header-item--active'>
				{page.name}
			</NavLink>)}
		<div className='app__header-select'>
			<Select
				defaultValue={locale}
				onChange={handleLanguageChange}>
				<Option value="zh">中文</Option>
				<Option value="en">英文</Option>
			</Select>
		</div>
	</div>
);

const mapStateToProps = (state) => {
	const { language: { locale } } = state.app;
	return { locale };
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleLanguageChange: (locale) => {
			dispatch(changeLang(locale));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
