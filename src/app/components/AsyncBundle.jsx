'use strict';

import React, { Component } from 'react';
/*
React router 非同步載入組件
*/
export default class Bundle extends Component {
	state = {
		mod: null,
	};
	UNSAFE_componentWillMount() {
		this.load(this.props);
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.load !== this.props.load) {
			this.load(nextProps);
		}
	}
	load(props) {
		this.setState({
			mod: null,
		});
		props.load(mod => {
			this.setState({
				mod: mod.default ? mod.default : mod,
			});
		});
	}
	render() {
		if (!this.state.mod) {
			return false;
		}
		return this.props.children(this.state.mod);
	}
}
