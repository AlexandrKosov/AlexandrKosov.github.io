import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Splitter.less';
import SplitterZone from '~c/splitter/SplitterZone';

class Splitter extends Component {
	static propTypes = {
	
	};
	
	static defaultProps = {
	};
	
	state = {
	
	};

	render() {
		const { children } = this.props;
console.log(children);
		return (
			<div className="splitter-container">
				<SplitterZone>{children[0].props.children}</SplitterZone>
				<div className="ui-split-handler">
					<div className="ui-split-sensitive"></div>
				</div>
				<SplitterZone>{children[1].props.children}</SplitterZone>
			</div>
		)
	}
}
export default Splitter;