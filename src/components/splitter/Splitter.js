import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Splitter.less';
import SplitterZone from '~c/splitter/SplitterZone';
import Portal from '~c/portal';

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
	ghostRef = React.createRef();
//--------------------------------------------------------------------------------
	onmousedown = (event) => {
		event.persist();
		const { horizontal=null, vertical=null  } = this.props;
		const { current: splitter } = this.splitterRef;
		const { current: handler } = this.handlerRef;
		const { current: ghost } = this.ghostRef;
		const { current: first } = this.firstRef;
		const { current: second } = this.secondRef;
		console.log(event.target, this.firstRef.current, horizontal, vertical);
		if(event.button == 0){
			//для вертикального положения сплиттера
			if(horizontal) {
				ghost.style.top = handler.getBoundingClientRect().top + 'px';
				ghost.style.left = handler.getBoundingClientRect().left + 'px';
				ghost.style.width = handler.getBoundingClientRect().width + 'px';
				ghost.style.display = "block";

				function moveAt(x, y) {
					ghost.style.top = y + 'px';	
				}

				function onMouseMove(event) {
					moveAt(event.clientX, event.clientY);
				}

				splitter.addEventListener('mousemove', onMouseMove);
				splitter.onmouseup = function() {
					
ghost.style.display = "none";
					first.style.height = ghost.getBoundingClientRect().top - splitter.getBoundingClientRect().top - 3 + 'px';	
					handler.style.top = ghost.getBoundingClientRect().top - splitter.getBoundingClientRect().top + 'px';
					second.style.height = splitter.getBoundingClientRect().height - ghost.getBoundingClientRect().top - 3 + 'px';
					
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
			<React.Fragment>
				<div className="splitter-container">
					<div className={classes} ref={this.splitterRef}>
						{this.firstZone()}
						{/* <SplitterZone ref={this.firstRef} className="splitter-zone_flexible">{children[0].props.children}</SplitterZone> */}
						<div className="split-handler" onMouseDown={this.onmousedown} ref={this.handlerRef} style={{top: '0'}}></div>
						{this.lastZone()}
						{/* <SplitterZone ref={this.secondRef} className="splitter-zone_fixed">{children[1].props.children}</SplitterZone> */}
					</div>
				</div>
				{<Portal>
					<div ref={this.ghostRef} className="split-handler-ghost"></div>
				</Portal>}
			  </React.Fragment>
		)
	}
}
export default Splitter;