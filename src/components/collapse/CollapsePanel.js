import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Collapse.less';

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
		// const { current: content } = this.contentRef;
		// const {isOpen} = this.state;
		// if(content && isOpen){
		// 	content.style.height = 'auto'; 
		// 	content.style.height = (content.scrollHeight) + 'px';
		// }				
	};

	changePanelView = (e) => {
		// const { current: content } = this.contentRef;
		// const {isOpen} = this.state;
		// if(content && !isOpen ){
		// 	content.style.height = 'auto'; 
		// 	content.style.height = (content.scrollHeight) + 'px';
		// } else {
		// 	content.style.height = 0;
		// }	

		this.setState((state)=>{
			return {isOpen: !state.isOpen}
		});
	};

	render() {
		const {header, children, className, open, ...attrs} = this.props;
console.log(this.props.open);
		const classes = classNames(
			"cos-collapse__item",
			className,
			this.state.isOpen?'open':''
		);
		const contentClasses = classNames(
			'cos-collapse__content',
			// className,
			// this.state.isOpen?'open':'closed'
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