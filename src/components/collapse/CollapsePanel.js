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
		isOpen: this.props.open,
		height: null
	};

	contentRef = React.createRef();

	componentDidMount () {
		const { current: content } = this.contentRef;
		if(this.state.isOpen){
			if (this.props.maxHeight > content.scrollHeight){
				content.style.height = content.scrollHeight + 'px';
			}else{
				content.style.height = this.props.maxHeight + 'px';
				content.style.overflow = "auto";
			}
			this.setState({height: content.style.height});	
		}
	};

	componentDidUpdate() {
		// const { current: content } = this.contentRef;
		// const domNode = ReactDOM.findDOMNode(content);
		// domNode.addEventListener("transitionend", this.setOverflow);
	};

	setOverflow = () => {
		// const { current: content } = this.contentRef;
		// if (this.state.isOpen){
		// 	content.style.overflow = "auto";
		// }	
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
	const { current: content } = this.contentRef;
	content.style.height = '0px';
 }

 onEnteredHandler ()  {
	const { current: content } = this.contentRef;
	if (this.props.maxHeight > content.scrollHeight){
		content.style.height = content.scrollHeight + 'px';
	}else{
		content.style.height = this.props.maxHeight + 'px';
		content.style.overflow = "auto";
	}
	this.setState({height: content.style.height, message: `OK Entered! OPEN ${content.style.height}`});
 }

 onEnteringHandler() {
	const { current: content } = this.contentRef;
	content.style.height = content.scrollHeight + 'px';
	this.setState({message: 'Entering... (Wait timeout!)'});
 }

 // Begin Exit(Collapse): Do anything!
 onExitHandler() {
	const { current: content } = this.contentRef;

	console.log("--",this.props.maxHeight, content.scrollHeight, this.state.height);
	console.log('beginExit:',content.style.height);

	content.style.height  = this.state.height;
	this.setState({message: 'Begin Exit...'});
 }
 onExitingHandler() {
	this.setState({message: 'Exiting... (Wait timeout!)'});
	const { current: content } = this.contentRef;
	content.style.height  = '0px';
	// content.style.overflow = "hidden";
 }

 onExitedHandler() {
	this.setState({message: 'OK Exited! COLLAPSED'});
	// const { current: content } = this.contentRef;
	// content.style.height = '0px';
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
		return (
			<div className={classes}>
				<header className="cos-collapse__header" 
						role="button"
						onClick={this.changePanelView}>
					{header} {this.state.message}
				</header>
				<CSSTransition
					in={this.state.isOpen}
					timeout={{ enter: 300, exit: 300 }}
					classNames="collapse"
					onEnter = {() =>  this.onEnterHandler()}
					onEntering = {() =>  this.onEnteringHandler()}
					onEntered={() =>  this.onEnteredHandler()}
	   
					onExit={() =>  this.onExitHandler()}
					onExiting={() =>  this.onExitingHandler()}
					onExited={() =>  this.onExitedHandler()}
				>
					<section className={contentClasses} 
							ref={this.contentRef} 
							style={{maxHeight:maxHeight}}
							>{children}</section>
			</CSSTransition>
			</div>
		)
	}
}
export default CollapsePanel;