import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Select } from 'antd';
import { ReducerContext } from '../ReduxIntlProvider';
import { changeLang } from '../actions/app';

import ReactIcon from '../../images/react_logo.png';

const { Option } = Select;

const Header = ({ pages }) => {
	const [state, dispatch] = useContext(ReducerContext);
	const {
		language: { locale },
	} = state.app;

	return (
		<div className="app__header">
			<img alt="" className="app__header-icon" src={ReactIcon} />
			{pages.map(page => (
				<NavLink
					key={page.path}
					to={page.path}
					className="app__header-item"
					activeClassName="app__header-item--active"
				>
					{page.name}
				</NavLink>
			))}
			<div className="app__header-select">
				<Select
					defaultValue={locale}
					onChange={lang => {
						changeLang(lang, dispatch);
					}}
				>
					<Option value="zh">中文</Option>
					<Option value="en">英文</Option>
				</Select>
			</div>
		</div>
	);
};

Header.propTypes = {
	pages: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Header;
