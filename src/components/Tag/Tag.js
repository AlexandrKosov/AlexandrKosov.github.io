import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '~c/Icon';

import './tag.less';

const Tag = ({
    label,
    icon,
    withClose,
    className,
    size,
    onClick,
    onCloseClick,
    id,
    ...attrs
}) => {

    const classes = classNames(
        'tag',
        className,
        (size==="large" || size==="default" || size==="small")?`tag-${size}`:null
    );

    const onClickHandler = () => {
        onClick(id);
    };

    const onCloseClickHandler = (e) => {
        e.stopPropagation();
        onCloseClick(e, id);
    };


    return (
    <div className={classes} onClick={onClickHandler}>
        {icon && <Icon name={icon} size={size}/>}
        <span className="tag-label">{label}</span>
        {withClose && <span className="tag-close" onClick={onCloseClickHandler}>
            <Icon name='delete' size={size}/>
        </span>}
    </div>
    )
};

Tag.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
    withClose: PropTypes.bool,
    className: PropTypes.string,
    size:  PropTypes.string,
    onClick: PropTypes.func,
    onCloseClick: PropTypes.func
};

Tag.defaultProps = {
    icon: '',
    withClose: false,
    className: '',
    size: 'default',
    onClick: ()=>{},
    onCloseClick: ()=>{}
};

export default Tag;