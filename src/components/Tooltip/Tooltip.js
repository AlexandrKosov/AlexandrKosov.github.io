import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Portal from '~c/portal';

import './Tooltip.less';

class Tooltip extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		content: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object,
			PropTypes.node
		  ]).isRequired,
		style: PropTypes.objectOf(PropTypes.string)
	};
	
	static defaultProps = {
		style: {}
	};
	
	state = {
		visible: false
	};

    targetRef = React.createRef();
    tooltipRef = React.createRef();

	componentDidMount(){
        const { current: targetObj } = this.targetRef;
		const {current: tooltipObj } = this.tooltipRef;


		let target = targetObj.getBoundingClientRect();
		let tooltip = tooltipObj.getBoundingClientRect();

		console.log(target, tooltip);



	}

	show = () => {
		this.setState({visible: true});
	}

	hide = () => {
		this.setState({visible: false});
	}

	render() {
		const { children, content, style } = this.props;
		const { visible = true } = this.state;

		const classes = classNames(
			'tooltip-element',
			visible?'':'hidden'
		);
		
		return (
			<span className="tooltip-wrapper">
				{<Portal><span style={style} className={classes} ref={this.tooltipRef}>{content}</span></Portal> }
				<span
					ref={this.targetRef}
					className="tooltip-target-element"
					onMouseEnter={this.show}
					onMouseLeave={this.hide}
				>{children}</span>
			</span>
		)
	}
	
}
export default Tooltip;