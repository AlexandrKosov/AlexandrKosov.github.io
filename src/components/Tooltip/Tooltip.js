import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Portal from '~c/portal';

import './Tooltip.less';
import { setTimeout } from 'timers';

const sizeTriangle = 10;
const horizMargin = 4;

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
		truePos: {},
		trianglePos: {},
		position: null
	};

	triangleRef = React.createRef();
    tooltipRef = React.createRef();

//target = то, на чем вызывается тултип; tooltip = сам тултип;
	reCalcPosition = (target) => {

		const {current: tooltipObj } = this.tooltipRef;
		const {current: triangleObj } = this.triangleRef;
		
		let triangle = triangleObj.getBoundingClientRect();
		let tooltip = tooltipObj.getBoundingClientRect();

		

		let left = target.left + (target.right - target.left)/2  - (tooltip.right - tooltip.left)/2;
		if (left > (window.innerWidth - tooltip.width)) {left=window.innerWidth - tooltip.width - horizMargin};
		if(left < 0) left = horizMargin;
		left+='px';

        const calc = window.innerHeight - target.bottom - tooltip.height - sizeTriangle;
		let truePos = {};
		let trianglePos = {};
		let position= '';
        if(calc > 0 ){
            truePos = {
				top: target.bottom + sizeTriangle + 'px',
				left
			};
			trianglePos = {
				top: target.bottom + sizeTriangle + 'px',
				left: target.left + (target.right - target.left)/2 - triangle.width/2 + 'px'
			};
        } else {
			position = 'position-up';
            truePos = {
				top: target.bottom - (target.height + tooltip.height + sizeTriangle) + 'px',
				left			
			};
			trianglePos = {
				top: target.top - sizeTriangle + 'px',
				left: target.left + (target.right - target.left)/2 - triangle.width/2 + 'px'
			};
        }  
        this.setState({position, truePos, trianglePos});
    };


	show = (e) => {
		e.persist();
		let target = e.target.getBoundingClientRect();
			this.reCalcPosition(target);{}
		this.setState({visible: true});
	}

	hide = (e) => {
		setTimeout(()=>{
			this.setState({visible: false});
		},500);
	}

	render() {
		const { children, content } = this.props;
		const { visible, truePos, trianglePos, position } = this.state;
		const classes = classNames(
			'tooltip-element',
			visible?'':'hidden',
			
		);
		return (
			<span className="tooltip-wrapper">
				{<Portal>
					<span style={truePos} className={classes} ref={this.tooltipRef} >
						{content}
					</span>
					<div style={trianglePos} className={classNames("tooltip-triangle",position,visible?'':'hidden',)} ref={this.triangleRef}></div>
				</Portal> }
				<span
					// ref={this.targetRef}
					className="tooltip-target-element"
					onMouseEnter={this.show}
					onMouseLeave={this.hide}
				>{children}</span>
			</span>
		)
	}
}
export default Tooltip;