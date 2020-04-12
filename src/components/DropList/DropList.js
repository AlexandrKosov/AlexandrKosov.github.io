import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Portal from '~c/portal';
import List from '~c/List';
import ListItem from '~c/List/ListItem';

import './DropList.less';

class DropList extends Component {
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

  state = {
    isOpen: false,
    selected: null,
  };

  dropHeadRef = React.createRef();

  dropListClick = () => {
    console.log('dropListClick');
    this.setState((state)=>{
      return {isOpen: !state.isOpen}
    });
  };

  componentDidMount () {
    const { current: dropHead } = this.dropHeadRef;
    let rect = dropHead.getBoundingClientRect();
    console.log('rect:',rect);
  }

  render() {
    const { className, disabled, active } = this.props;
    const { isOpen, selected } = this.state;
    const classes = classNames(
      'drop-list',
      className,
      { disabled },
      { active },
    );
    return (
      <React.Fragment>
        <div className={classes} onClick={this.dropListClick} ref={this.dropHeadRef}>
          {selected || '—'}
        </div>
        { isOpen && <Portal>
          {this.props.children}
        </Portal>}
      </React.Fragment>
    );
  }
}

export default DropList;
