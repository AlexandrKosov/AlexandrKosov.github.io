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
        <Tag className={classes}>
            {children}
        </Tag>
    )
};

Badge.propTypes = {
    pill: PropTypes.bool,
    variant: PropTypes.string,
    className: PropTypes.string,
    as: PropTypes.string,  
};

Badge.defaultProps = {
    pill: false,
    variant: '',
    as: 'span',  
};

export default Badge;