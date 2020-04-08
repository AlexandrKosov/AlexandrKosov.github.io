import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '~c/Icon';

import './Button.less';

const Button = ({
    onClick,
    className,
    disabled,
    icon,
    children,
    toggled, //toggle-кнопка действует как чекбокс. т.е. она либо активна, либо неактивна
    variant,
    ...attrs
}) => {

    const [active, setActive] = useState(false);

    const classes = classNames(
       'button',
       className,
       {'active': active},
       'button-'+variant
    );
    const Ico = icon?<Icon name={icon} />:null;

    const actionClick = (e) => {
        disabled ? e.preventDefault() : toggled ? onToggledClick(e): onClick(e);
    }

    const onToggledClick = (e) => {
        setActive(!active);
        onClick(e);
    }
    
    return (
        <button className={classes}
                disabled={disabled}
                onClick={actionClick}
                {...attrs}
        >
            {Ico}
            {children}
        </button>
    )
};

Button.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.node,
    toggled: PropTypes.bool
};

Button.defaultProps = {
    onClick: ()=>{},
    disabled: false,
    className: '',
    icon: '',
    children: 'Button',
    toggled: false
};

export default Button;