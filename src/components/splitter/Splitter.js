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
		return (
			<div className="splitter-container">
				<SplitterZone></SplitterZone>
				<div className="ui-split-handler">
					<div className="ui-split-sensitive"></div>
				</div>
				<SplitterZone></SplitterZone>
			</div>
		)
	}
}
export default Splitter;