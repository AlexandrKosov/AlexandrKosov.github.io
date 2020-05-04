import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Input.less';

import Icon from '~c/Icon';

const paddingRightwithoutScroll = 24;	
const paddingRightwithScroll = 40;	

class Input extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		className: PropTypes.string,
		label: PropTypes.string,
		error: PropTypes.string,
		clearable:PropTypes.bool, 
		multiline:PropTypes.bool, 
		maxHeight:PropTypes.string,
		value: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired
	};
	
	static defaultProps = {
		className: '',
		label: '',
		error: '',
		clearable:false, 
		multiline:false, 
		maxHeight:'',
	};

	// state = {
	// 	text: '' //промежуточное значение в текстовом поле
	// }

	multiRef = React.createRef();
	clearRef = React.createRef();
	
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
		this.props.onChange(e.target.value);
	}
	updateTextareaSize = () => {
		const { name, className, error, label, clearable, multiline, maxHeight, ...attrs } = this.props;
		if (multiline){
			const { current: multi } = this.multiRef;
			const { current: clear } = this.clearRef;

			multi.style.height = 'auto'; 
			multi.style.height = (multi.scrollHeight) + 'px'; 
			if(parseInt(multi.style.height) >= parseInt(maxHeight)){
				multi.style.height = maxHeight;
				multi.style.overflowY = 'auto';
				if(clearable) {
					multi.style.paddingRight=paddingRightwithScroll + 'px';
					clear.style.right = (paddingRightwithScroll - paddingRightwithoutScroll) + 'px';
				}
			}else{
				multi.style.overflowY = 'hidden';
				multi.style.paddingRight=paddingRightwithoutScroll + 'px';
				clear.style.right = 0;
			}
		}
	}
	clearField = () => {
		const { multiline } = this.props;
		if (multiline){
			const { current: multi } = this.multiRef;
			multi.value = '';
			this.updateTextareaSize();
		};

		


		this.props.onClear();
	};

	render() {
		const { name, className, error, label, clearable, onClear, onChange,  multiline, maxHeight, value, ...attrs } = this.props;
		const classes = classNames(
			'text-field',
			className,
			{error},
			multiline?'text-field-multiline':'',
			clearable?'text-field-clearable':''
		);

		if(attrs.type!=='text' && multiline) throw new Error('Не текстовое поле не может быть многострочным');
		return (
			<React.Fragment>
				<div className="text-field-wrapper">
					{label && <label className="text-field-label" htmlFor={name}>{label}</label>}
					{attrs.required && <span className="text-field-required">*</span>}
					
					{!multiline &&
					<input name={name}
						id={name}
						className={classes}
						value={value}
						onChange={this.onChangeHandler}
						{...attrs} />
					}
				{/* //----------------------------------------- */}
					{attrs.type==='text' && multiline && 
						<textarea name={name}
						ref={this.multiRef}
						id={name}
						className={classes}
						style={{maxHeight:maxHeight}}
						value={value}
						{...attrs}
						onChange={this.onChangeHandler}
						>
						</textarea>
					}
					{clearable && <div className="text-field-clear" onClick={this.clearField} ref={this.clearRef}>
						<Icon name="cross" size="small"/>
					</div>} 
				</div>	
				{error && <div className="text-field-error">{error}</div>}
			</React.Fragment>	
		)
	}
}

export default Input;