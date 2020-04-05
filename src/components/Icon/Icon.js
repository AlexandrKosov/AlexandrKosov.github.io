import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Icon.less';

const Icon = ({name, className, size}) => {

    const classes = classNames(
        'icon',
        `icon-${name}`,
        (size==="large" || size==="default" || size==="small")?`icon-${size}`:null, 
        className
    );
    let styles;
    if(size!=="large" && size!=="default" && size!=="small"){
        let width = size;
        let height = size;
        styles = {width, height}
    }
    return (
        <i className={classes} style={styles}></i>
    )
}

Icon.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
};

Icon.defaultProps = {
    name: '',
    className: '',
    size: null
};

export default Icon;