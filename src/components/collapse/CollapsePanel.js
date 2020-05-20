import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Collapse.less';
import ReactDOM from 'react-dom';

import {CSSTransition} from 'react-transition-group';

class CollapsePanel extends Component {
	static propTypes = {
		maxHeight: PropTypes.number
	};
	
	static defaultProps = {

	};

	state = {
		isOpen: this.props.open,
		height: null
	};

	contentRef = React.createRef();

	componentDidMount () {
		const {maxHeight = undefined} = this.props;
		const { current: content } = this.contentRef;
		if(this.state.isOpen){
			if(maxHeight){
				if (maxHeight > content.scrollHeight){
					content.style.height = content.scrollHeight + 'px';
				}else{
					content.style.height = maxHeight + 'px';
					content.style.overflow = "auto";
				}
			}else{
				content.style.height = content.scrollHeight + 'px';
			}
			this.setState({height: content.style.height});	
		}
		
	};

	// componentDidUpdate() {
	// 	console.log('componentDidUpdate');
	// };

	changePanelView = (e) => {	
		const { current: content } = this.contentRef;
		content.style.overflow = "hidden";
		this.setState((state)=>{
			return {isOpen: !state.isOpen}
		});
	};
//--------------------------------------------------------------------------------------------
	onEnterHandler()  {
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
	}

	onEnteringHandler() {
		const { current: content } = this.contentRef;
		content.style.height = content.scrollHeight + 'px';
	}

	onExitHandler() {
		const { current: content } = this.contentRef;
		content.style.height  = this.state.height;
	}
	onExitingHandler() {
		const { current: content } = this.contentRef;
		content.style.height  = '0px';
	}

	onExitedHandler() {
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
			this.state.isOpen?'expand-done':'collapse-done'
		);
		return (
			<section className={classes}>
				<header className="cos-collapse__header" 
						role="button"
						onClick={this.changePanelView}>
					{header} {this.state.message}
				</header>
				<CSSTransition 
					in={this.state.isOpen}
					timeout={{ enter: 300, exit: 300 }}
					classNames={{
						appear: 'appear-enter',
						appearActive: 'active-appear',
						appearDone: 'done-appear',
						enter: 'expand-enter',
						enterActive: 'expand-active',
						enterDone: 'expand-done',
						exit: 'collapse-enter',
						exitActive: 'collapse-active',
						exitDone: 'collapse-done',
					   }}
					onEnter = {() =>  this.onEnterHandler()}
					onEntering = {() =>  this.onEnteringHandler()}
					onEntered={() =>  this.onEnteredHandler()}
	   
					onExit={() =>  this.onExitHandler()}
					onExiting={() =>  this.onExitingHandler()}
					onExited={() =>  this.onExitedHandler()}
				>
					<div className={contentClasses} 
							ref={this.contentRef} 
							style={{maxHeight:maxHeight}}
							>{children}</div>
			</CSSTransition>
			</section>
		)
	}
}
export default CollapsePanel;