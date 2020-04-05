import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TabItem = ({
  children, label, index, active, ...attrs
}) => {
  const classes = classNames(
    'tab-item',
    { 'active': index === active }
  );

  return (
    <div className={classes} {...attrs}>
      {children}
    </div>
  );
};

TabItem.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node
  ]).isRequired,
  children: PropTypes.node,
 
};

TabItem.defaultProps = {
  children: null,

};

export default TabItem;
