import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ListItem from '~c/List/ListItem';
import './List.less';

const List = ({
    children, className, ...attrs
}) => {

	const classes = classNames(
        'list',
        className
    );

    return (
        <div className={classes} {...attrs}>
            {children}
		</div>
    )
};

List.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

List.defaultProps = {
    children: null,
    className: ''
};

export default List;