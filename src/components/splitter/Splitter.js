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

	splitterRef = React.createRef();
	firstRef = React.createRef();
	secondRef = React.createRef();
	handlerRef = React.createRef();
//--------------------------------------------------------------------------------
	onmousedown = (event) => {
		event.persist();
		const { horizontal=null, vertical=null  } = this.props;
		const { current: splitter } = this.splitterRef;
		const { current: handler } = this.handlerRef;
		console.log(event.target, this.firstRef.current, horizontal, vertical);
		if(event.button == 0){
			//для вертикального положения сплиттера
			if(horizontal) {

				//let shiftX = event.clientX - event.currentTarget.getBoundingClientRect().left;
				let shiftY = event.clientY - event.target.getBoundingClientRect().top;
				//moveAt(event.clientX, event.clientY);
				console.log(event.clientY, event.target.getBoundingClientRect().top,handler);
				function moveAt(pageX, pageY) {
				//	event.currentTarget.style.left = pageX - shiftX + 'px';
				handler.style.top = pageY - shiftY + 'px';
				}

				function onMouseMove(event) {
					moveAt(event.clientX, event.clientY);
				}

				splitter.addEventListener('mousemove', onMouseMove);
				splitter.onmouseup = function() {
					splitter.removeEventListener('mousemove', onMouseMove); 
					handler.onmouseup = null;
				};

			}//для горизонтального положения сплиттера
			else if(vertical){

			}
		}
	};
		
	ondragstart = () => {
		return false;
	};

	firstZone = () => {
		const { children } = this.props;
		return (<SplitterZone ref={this.firstRef} className="splitter-zone_flexible" {...children[0].props}>
			{children[0].props.children}
		</SplitterZone>)

	}

	lastZone = () => {
	const { children } = this.props;
		return (<SplitterZone ref={this.firstRef} className="splitter-zone_fixed" {...children[1].props}>
			{children[1].props.children}
		</SplitterZone>)
	}


//--------------------------------------------------------------------------------
	render() {
		const { children, horizontal=null, vertical=null  } = this.props;
		const classes = classNames(
			"splitter",
			horizontal?'splitter-horizontal':null,
			vertical?'splitter-vertical':null,
		);
		console.log("1",children[0]);
		return (
			<div className="splitter-container">
				<div className={classes} ref={this.splitterRef}>
					{this.firstZone()}
					{/* <SplitterZone ref={this.firstRef} className="splitter-zone_flexible">{children[0].props.children}</SplitterZone> */}
					<div className="split-handler" onMouseDown={this.onmousedown} ref={this.handlerRef} >
						{/* <div className="split-sensitive"></div> */}
					</div>
					{this.lastZone()}
					{/* <SplitterZone ref={this.secondRef} className="splitter-zone_fixed">{children[1].props.children}</SplitterZone> */}
				</div>
			</div>
		)
	}
}
export default Splitter;