import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Input.less';

const Input = ({name, className, error, label, clearable, multiline, ...attrs}) => {
	
	const classes = classNames(
		'text-field',
		className,
		{error},
		multiline?'text-field-multiline':'',
		clearable?'text-field-clearable':''
	);

	if(multiline) {
	let zx=document.querySelector('.text-field-multiline');
	if(zx)
		console.log(zx.scrollHeight,zx.offsetHeight);
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
				//ref={this.multiRef}
				id={name}
				className={classes}
				{...attrs}>
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

Input.propTypes = {
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	label: PropTypes.string,
	error: PropTypes.string
};

Input.defaultProps = {
	className: '',
	label: '',
	error: ''
};

export default Input;