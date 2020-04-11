
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ListItem = ({
  children,
  className,
  disabled,
  active,
  ...attrs
}) => {
  const classes = classNames(
    'list-item',
    className,
    { disabled },
    { active },
  );

  return (
    <div className={classes} {...attrs}>
      {children}
    </div>
  );
};

ListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

ListItem.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  active: false,
};

export default ListItem;
