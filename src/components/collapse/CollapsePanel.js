import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Collapse.less';
import ReactDOM from 'react-dom';

import {CSSTransition} from 'react-transition-group';

class CollapsePanel extends Component {
	static propTypes = {
	
	};
	
	static defaultProps = {
	};

	state = {
		isOpen: this.props.open
	};

	contentRef = React.createRef();

	componentDidMount () {
					
	};

	componentDidUpdate() {
		// const { current: content } = this.contentRef;
		// const domNode = ReactDOM.findDOMNode(content);
		// domNode.addEventListener("transitionend", this.setOverflow);
	};

	setOverflow = () => {
		const { current: content } = this.contentRef;
		if (this.state.isOpen){
			content.style.overflow = "auto";
		}	
	}

	changePanelView = (e) => {	
		const { current: content } = this.contentRef;
		content.style.overflow = "hidden";
		this.setState((state)=>{
			return {isOpen: !state.isOpen}
		});
	};
//--------------------------------------------------------------------------------------------
  // Begin Enter(expand): Do anything!
  onEnterHandler()  {
	this.setState({message: 'Begin Enter...'});
	this.contentRef.current.style.height = '0px';
 }

 onEnteredHandler ()  {
	const { current: content } = this.contentRef;
	if (this.props.maxHeight > content.scrollHeight){
		content.style.height = content.scrollHeight + 'px';
	}else{
		content.style.height = this.props.maxHeight + 'px';
		content.style.overflow = "auto";
	}
	this.setState({message: `OK Entered! OPEN ${content.style.height}`});
 }

 onEnteringHandler() {
	this.setState({message: 'Entering... (Wait timeout!)'});
 }

 // Begin Exit(Collapse): Do anything!
 onExitHandler() {
	this.setState({message: 'Begin Exit...'});
	const { current: content } = this.contentRef;
	content.style.height = '0px';
 }

 onExitingHandler() {
	this.setState({message: 'Exiting... (Wait timeout!)'});
 }

 onExitedHandler() {
	this.setState({message: 'OK Exited! COLLAPSED'});
 }
//--------------------------------------------------------------------------------------------
	render() {
		const {header, children, className, open, maxHeight, style, ...attrs} = this.props;
		const classes = classNames(
			"cos-collapse__item",
			className,
			this.state.isOpen?'open':''
		);
		const contentClasses = classNames(
			'cos-collapse__content',
			this.state.isOpen?'collapse-enter-done':'collapse-exit-done'
		);
		console.log("m",maxHeight);
		return (
			<div className={classes}>
				<header className="cos-collapse__header" 
						role="button"
						onClick={this.changePanelView}>
					{header} {this.state.message}
				</header>
				<CSSTransition
					in={this.state.isOpen}
					timeout={300}
					classNames="collapse"
					onEnter = {() =>  this.onEnterHandler()}
					onEntering = {() =>  this.onEnteringHandler()}
					onEntered={() =>  this.onEnteredHandler()}
	   
					onExit={() =>  this.onExitHandler()}
					onExiting={() =>  this.onExitingHandler()}
					onExited={() =>  this.onExitedHandler()}
					//unmountOnExit
					// onEnter={() => setShowButton(false)}
					// onExited={() => setShowButton(true)}
				>
					<section className={contentClasses} 
							ref={this.contentRef} 
							style={{maxHeight:maxHeight, overflow: 'auto'}}
							>{children}</section>
			</CSSTransition>
			</div>
		)
	}
}
export default CollapsePanel;