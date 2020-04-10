
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ListItem = ({
  children,
  className,
  ...attrs
}) => {
  const classes = classNames(
    'list-item',
    className,
  );

  return (
    <div className={classes} {...attrs}>
      {children}
    </div>
  );
};

ListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

ListItem.defaultProps = {
  children: null,
  className: ''
};

export default ListItem;
