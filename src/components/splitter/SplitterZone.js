import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


class SplitterZone extends Component {
	static propTypes = {
	
	};
	
	static defaultProps = {
	};
	
	state = {
	
	};

	render() {
        const {children} = this.props;
		return (
			<React.Fragment>
                <div className="splitter-zone">
                    {children}
                </div>
			</React.Fragment>
		)
	}
}
export default SplitterZone;