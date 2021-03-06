import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ButtonGroup.less';

const ButtonGroup = ({
	children,
	className,
	vertical,
	...attrs
}) => {
	
	const classes = classNames(
		'button-group',
		className,
		{ vertical }
	);

	return (
		<div className={classes} {...attrs}>
			{children}
		</div>
	)
}

ButtonGroup.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	vertical: PropTypes.bool
};

ButtonGroup.defaultProps = {
	children: null,
	className: '',
	vertical: false
};

export default ButtonGroup;