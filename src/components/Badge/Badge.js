import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Badge.less';

const Badge = ({
    pill,
    variant,
    className,
    children,
    as,
    ...attrs
}) => {

	const classes = classNames(
        'badge',
        { pill },
        className,
        'badge-'+variant
    );

    const Tag = as ? as : 'span';

    return (
        <Tag className={classes} {...attrs}>
            {children}
        </Tag>
    )
};

Badge.propTypes = {
    pill: PropTypes.bool,
    variant: PropTypes.string,
    className: PropTypes.string,
    as: PropTypes.string,  
    children: PropTypes.node
};

Badge.defaultProps = {
    pill: false,
    variant: '',
    as: 'span',
    children: null
};

export default Badge;