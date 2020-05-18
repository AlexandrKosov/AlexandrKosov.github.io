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
	changePanelView = (e) => {
		console.log("e:",e);
		// this.setState((prev)=>{
		// 	console.log(prev.isOpen);
		// 	isOpen: !this.state.isOpen;
		// });
		this.setState((state)=>{
			return {isOpen: !state.isOpen}
		  });
		setTimeout(()=>{
			console.log(this.state.isOpen);
		},0);
	};

	render() {
		const {header, children, className, open, ...attrs} = this.props;
console.log(this.props.open);
		const classes = classNames(
			"cos-collapse__item",
			className,
			this.state.isOpen?'open':''
		);


		return (
			<div className={classes}>
				<header className="cos-collapse__header" 
						role="button"
						onClick={(e)=>this.changePanelView(e)}>
					{header}
				</header>
				<section className="cos-collapse__content">{children}</section>
			</div>
		)
	}
}
export default CollapsePanel;