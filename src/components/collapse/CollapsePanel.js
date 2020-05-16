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
			<React.Fragment>
				<header>{header}</header>
				<section>{children}</section>
			</React.Fragment>
		)
	}
}
export default CollapsePanel;