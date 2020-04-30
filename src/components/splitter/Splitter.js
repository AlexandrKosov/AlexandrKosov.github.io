import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Splitter.less';
import SplitterZone from '~c/splitter/SplitterZone';

const sizeTriangle = 10;
const horizMargin = 4;

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
				<div class="ui-split-handler">
					<div class="ui-split-sensitive"></div>
				</div>
				<SplitterZone></SplitterZone>
			</div>
		)
	}
}
export default Splitter;