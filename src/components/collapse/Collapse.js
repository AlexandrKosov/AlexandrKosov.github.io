import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CollapsePanel from './CollapsePanel';
import './Collapse.less';

class Collapse extends Component {
	static propTypes = {
	
	};
	
	static defaultProps = {
	};
	
	state = {
		isOpen: false
	};

	render() {
		const {children, className, ...attrs} = this.props;
		const classes = classNames(
			"cos-collapse",
			className
		);
		return (
			<React.Fragment>
				<div className={classes}>
				{children.map((child)=>React.cloneElement(child))}
				</div>
			</React.Fragment>
		)
	}
}
export default Collapse;
Collapse.Panel = CollapsePanel;