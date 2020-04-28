import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Portal from '~c/portal';

import './Tooltip.less';
import { setTimeout } from 'timers';

class Tooltip extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		content: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object,
			PropTypes.node
		  ]).isRequired,
	};
	
	static defaultProps = {
	};
	
	state = {
		visible: false,
		truePos: {}
	};

    targetRef = React.createRef();
    tooltipRef = React.createRef();

	// componentDidMount(){
    //     // const { current: targetObj } = this.targetRef;
	// 	// const {current: tooltipObj } = this.tooltipRef;

		
	// 	// 	let target = targetObj.getBoundingClientRect();
	// 	// 	let tooltip = tooltipObj.getBoundingClientRect();
		
	// 	// 	this.reCalcPosition(target, tooltip);
	// 	//setTimeout(()=>{},0);
	// }

//target = то, на чем вызывается тултип; tooltip = сам тултип;
	reCalcPosition = (target, tooltip) => {
        const calc = window.innerHeight - target.bottom - tooltip.height - 10;//умещается ли внизу? (10пикс на стрелку)
        let truePos = {};
        if(calc > 0 ){
            truePos = {
                top: target.bottom + 10 + 'px',
                left: target.left + (target.right - target.left)/2  - (tooltip.right - tooltip.left)/2 + 'px'
			};
        } else {
            truePos = {
				top: target.bottom - (target.height + tooltip.height + 10) + 'px',
                left: target.left + (target.right - target.left)/2  - (tooltip.right - tooltip.left)/2 + 'px'
			};
        }  
        this.setState({truePos});
    };


	show = (e) => {
		e.persist();
		console.log(e);
		//const { current: targetObj } = this.targetRef;
		const {current: tooltipObj } = this.tooltipRef;
			//let target = targetObj.getBoundingClientRect();
			let target = e.target.getBoundingClientRect();
			let tooltip = tooltipObj.getBoundingClientRect();
			this.reCalcPosition(target, tooltip);
		this.setState({visible: true});
	}

	hide = (e) => {
		this.setState({visible: false});
	}

	render() {
		const { children, content } = this.props;
		const { visible, truePos } = this.state;
		const classes = classNames(
			'tooltip-element',
			visible?'':'hidden'
		);
		
		return (
			<span className="tooltip-wrapper">
				{<Portal><span style={truePos} className={classes} ref={this.tooltipRef}>{content}</span></Portal> }
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