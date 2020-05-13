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
		const {children, className, minHeight, ...attrs} = this.props;
		
		const classes = classNames(
			"splitter-zone",
			className
		);

		return (
			<React.Fragment>
                <div className={classes} {...attrs}>
                    {children}
                </div>
			</React.Fragment>
		)
	}
}
export default SplitterZone;