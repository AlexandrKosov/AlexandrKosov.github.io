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
    active, //имеет значение только для toggle-кнопок, устанавливает начальное значение
    ...attrs
}) => {

    const [activeBtn, setActive] = useState(active);

    const variableStyle = variant?'button-'+variant:null;
    const classes = classNames(
       'button',
       className,
       {'active': toggled && activeBtn},
       variableStyle
    );

    const Ico = icon?<Icon name={icon} />:null;

    const actionClick = (e) => {
        disabled ? e.preventDefault() : toggled ? onToggledClick(e): onClick(e);
    }

    const onToggledClick = (e) => {
        setActive(!activeBtn);
        onClick(e);
    }
    
    return (
        <button className={classes}
                disabled={disabled}
                onClick={actionClick}
                {...attrs}
        >
            <span className="button-inner">
                {Ico}
                {children}
            </span>
        </button>
    )
};

Button.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.node,
    toggled: PropTypes.bool,
    active: PropTypes.bool,
};

Button.defaultProps = {
    onClick: ()=>{},
    disabled: false,
    className: '',
    icon: '',
    children: 'Button',
    toggled: false,
    active: false
};

export default Button;