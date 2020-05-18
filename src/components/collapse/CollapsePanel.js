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
		isOpen: false
	};

	render() {
		const {header, children, className, open, ...attrs} = this.props;
console.log(this.props.open);
		const classes = classNames(
			"cos-collapse__item",
			className,
			open?'open':''
		);


		return (
			<div className={classes}>
				<header className="cos-collapse__header" role="button">{header}</header>
				<section className="cos-collapse__content">{children}</section>
			</div>
		)
	}
}
export default CollapsePanel;