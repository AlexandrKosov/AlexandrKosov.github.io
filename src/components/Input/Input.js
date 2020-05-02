import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Input.less';

//const Input = ({name, className, error, label, clearable, multiline, ...attrs}) => {
	

class Input extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		className: PropTypes.string,
		label: PropTypes.string,
		error: PropTypes.string
		//type: PropTypes.oneOf(['text', 'password']),....
	};
	
	static defaultProps = {
		className: '',
		label: '',
		error: ''
	};
	multiRef = React.createRef();

	componentDidMount() {	
		const { current: multi } = this.multiRef;
		if(multi){
			multi.style.overflowY = 'hidden';
			multi.style.height = 'auto'; 
			multi.style.height = (multi.scrollHeight) + 'px';
			window.addEventListener("resize", this.updateTextareaSize);			
		}
	}
	componentWillUnmount() {
        window.removeEventListener("resize", this.updateTextareaSize);
    }

	onChangeHandler = (e) => {
		this.updateTextareaSize();
	}
	updateTextareaSize = () => {
		const { name, className, error, label, clearable, multiline, maxHeight, ...attrs } = this.props;
		if (multiline){
			const { current: multi } = this.multiRef;

			multi.style.height = 'auto'; 
			multi.style.height = (multi.scrollHeight) + 'px'; 
			if(multi.style.height>=maxHeight){
				multi.style.height = maxHeight;
				multi.style.overflowY = 'auto';
			}else{
				multi.style.overflowY = 'hidden';
			}
		}
	}
	
	render() {
		const { name, className, error, label, clearable, multiline, maxHeight, ...attrs } = this.props;
		const classes = classNames(
			'text-field',
			className,
			{error},
			multiline?'text-field-multiline':'',
			clearable?'text-field-clearable':''
		);
	
		if(multiline) {
			//onChangeHandler
			console.log(maxHeight);
		}
	
		if(attrs.type!=='text' && multiline) throw new Error('Не текстовое поле не может быть многострочным');
		return (
			<div className="text-field-wrapper">
				{label && <label className="text-field-label" htmlFor={name}>{label}</label>}
				{attrs.required && <span className="text-field-required">*</span>}
				
				{!multiline &&
				<input name={name}
					id={name}
					className={classes}
					{...attrs} />
				}	
				{attrs.type==='text' && multiline && 
					<textarea name={name}
					ref={this.multiRef}
					id={name}
					className={classes}
					style={{maxHeight:maxHeight}}
					{...attrs}
					onChange={this.onChangeHandler}
					>
						{attrs.value}
					</textarea>
	
					// <div className="inner-textarea" {...attrs}>
					// 	{attrs.value}
					// </div>	
				}
				{error && <span className="text-field-error">{error}</span>}
			</div>	
		)
	}
}

export default Input;