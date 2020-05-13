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
		const {children, className, minHeight, maxHeight, minWidth, maxWidth, height, width, ...attrs} = this.props;
		
		const classes = classNames(
			"splitter-zone",
			className
		);
		const styles = {minHeight, maxHeight, minWidth, maxWidth, height, width };
		console.log("style:",styles);
		return (
			<React.Fragment>
                <div className={classes} style={styles} {...attrs}>
                    {children}
                </div>
			</React.Fragment>
		)
	}
}
export default SplitterZone;