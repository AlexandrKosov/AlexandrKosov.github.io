import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CollapsePanel from './CollapsePanel';
import './Collapse.less';

class Collapse extends Component {
	static propTypes = {
		defaultActiveKey: PropTypes.array
	};
	
	static defaultProps = {
		defaultActiveKey: []
	};

	render() {
		const {children, className,defaultActiveKey,panelMaxHeight, ...attrs} = this.props;
		const classes = classNames(
			"cos-collapse",
			className
		);
		return (
			<React.Fragment>
				<div className={classes}>
					{children.map((child)=>{
						return React.cloneElement(child, {open:defaultActiveKey.includes(child.key), maxHeight: panelMaxHeight})

					})}
				</div>
			</React.Fragment>
		)
	}
}
export default Collapse;
Collapse.Panel = CollapsePanel;