
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class ListItem extends Component {
  
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
  };
  
  static defaultProps = {
    children: null,
    className: '',
    disabled: false,
    active: false,
  };

  render() {
    const {  children,
            className,
            disabled,
            active,
            ...attrs} = this.props;
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
  }

};

export default ListItem;
