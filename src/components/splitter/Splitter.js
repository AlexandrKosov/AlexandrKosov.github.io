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
		const { children, horizontal=null, vertical=null  } = this.props;
console.log(children);
		const classes = classNames(
			"splitter",
			horizontal?'splitter-horizontal':null,
			vertical?'splitter-vertical':null,
		);

		return (
			<div className="splitter-container">
				<div className={classes}>
					<SplitterZone>{children[0].props.children}</SplitterZone>
					<div className="split-handler">
						<div className="split-sensitive"></div>
					</div>
					<SplitterZone>{children[1].props.children}</SplitterZone>
				</div>
			</div>
		)
	}
}
export default Splitter;