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
    truePos: {}
  };

  dropHeadRef = React.createRef();

  dropListClick = (e) => {
    e.persist();
    console.log('dropListClick',e, this);
    this.setState((state)=>{
      return {isOpen: !state.isOpen}
    });
  };
  dropListItemClick = (e) => {
    e.stopPropagation();
    e.persist();
    console.log('dropListItemClick',e, this, e.target.value);
    this.setState((state)=>{
      return {isOpen: !state.isOpen}
    });
  };
  componentDidMount () {
    const { current: dropHead } = this.dropHeadRef;
    setTimeout(()=>{
      let rect = dropHead.getBoundingClientRect();
      this.state.truePos = {
        top: rect.bottom + 'px',
        left: rect.x + 'px',
        position: 'absolute',
        width: rect.width + 'px',
      }
    },0);
  }

  render() {
    const { className, disabled, active } = this.props;
    const { isOpen, selected, truePos } = this.state;
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
        {<Portal>
          <div style={truePos} onClick={this.dropListItemClick}>
            {isOpen && this.props.children}
          </div>
        </Portal>}
      </React.Fragment>
    );
  }
}

export default DropList;
