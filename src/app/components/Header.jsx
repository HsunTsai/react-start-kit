import React, { useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Select } from 'antd';
import { changeLang } from '../actions/base';

import ReactIcon from '../../images/react_logo.png';

const { Option } = Select;

const Header = ({ locale, pages, handleLanguageChange }) => {
	const [path, setPath] = useState(pages[0] ? pages[0].path : '');
	return (
		<div className='app__header'>
			<img className='app__header-icon' src={ReactIcon} />
			{pages.map((page, index) =>
				<NavLink key={index}
					to={page.path}
					onClick={() => setPath(page.path)}
					className={classNames('app__header-item', { 'app__header-item--active': path == page.path })}>
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
};

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
