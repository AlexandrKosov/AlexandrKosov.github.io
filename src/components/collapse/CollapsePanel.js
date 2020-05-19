import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Collapse.less';
import ReactDOM from 'react-dom';

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
		const { current: content } = this.contentRef;
		const domNode = ReactDOM.findDOMNode(content);
		domNode.addEventListener("transitionend", this.setOverflow, false);
	};

	setOverflow = () => {
		const { current: content } = this.contentRef;
		content.style.overflow = "auto";
	}

	changePanelView = (e) => {	
		const { current: content } = this.contentRef;
		content.style.overflow = "hidden";
		this.setState((state)=>{
			return {isOpen: !state.isOpen}
		});
	};

	render() {
		const {header, children, className, open, ...attrs} = this.props;
		const classes = classNames(
			"cos-collapse__item",
			className,
			this.state.isOpen?'open':''
		);
		const contentClasses = classNames(
			'cos-collapse__content',
		);

		return (
			<div className={classes}>
				<header className="cos-collapse__header" 
						role="button"
						onClick={(e)=>this.changePanelView(e)}>
					{header}
				</header>
				<section className={contentClasses} ref={this.contentRef}>{children}</section>
			</div>
		)
	}
}
export default CollapsePanel;