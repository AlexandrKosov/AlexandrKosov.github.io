import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Collapse.less';

class CollapsePanel extends Component {
	static propTypes = {
	
	};
	
	static defaultProps = {
	};
	
	state = {
	
	};

	render() {
		const {header, children, ...attrs} = this.props;
		return (
			<div className="cos-collapse__item">
				<header className="cos-collapse__header" role="button">{header}</header>
				<section className="cos-collapse__content">{children}</section>
			</div>
		)
	}
}
export default CollapsePanel;