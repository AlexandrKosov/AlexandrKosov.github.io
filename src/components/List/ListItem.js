
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class ListItem extends Component {
  
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    onChangeActiveItem: PropTypes.func,
    tag: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ])
  };
  
  static defaultProps = {
    children: null,
    className: '',
    disabled: false,
    active: false,
    onChangeActiveItem: ()=>{},
    tag: 'div'
  };

  componentDidMount(){
    const { children,
      className,
      disabled,
      active,
      index,
      onChangeActiveItem,
      ...attrs} = this.props;
    if(active){
      onChangeActiveItem(index)
    }
  }

  render() {
    const {  children,
            className,
            disabled,
            active,
            index,
            tag: Tag,
            onChangeActiveItem,
            ...attrs} = this.props;
    const classes = classNames(
      'list-item',
      className,
      { disabled },
      { active },
    );
    return (
      <Tag className={classes} 
      {...attrs}
      onClick={()=>onChangeActiveItem(index)}
      >
        {children}
      </Tag>
    );
  }

};

export default ListItem;
