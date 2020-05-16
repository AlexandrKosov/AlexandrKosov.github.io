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
		const {children, ...attrs} = this.props;
		console.log(children);
		return (
			<React.Fragment>
				{children.map((child)=>React.cloneElement(child))
				}
			</React.Fragment>
		)
	}
}
export default Collapse;
Collapse.Panel = CollapsePanel;