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
    console.log('drop:', e ,e.currentTarget, e.target);
    this.setState((state)=>{
      return {isOpen: !state.isOpen}
    });
  };

  componentDidMount () {
    const { current: dropHead } = this.dropHeadRef;
    let rect = dropHead.getBoundingClientRect();
    console.log('rect:',rect);
    // this.state.truePos = {
    //   top: '608px',
    //   left: '243px',
    //   position: 'absolute',
    //   width: '300px'
    // }
    this.state.truePos = {
      top: rect.bottom + 'px',
      left: rect.x+'px',
      position: 'fixed',
      width: rect.width + 'px',
      border: '1px solid red'
    }
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
        <div className={classes} onClick={(e)=>{this.dropListClick(e)}} ref={this.dropHeadRef}>
          {selected || '—'}
        </div>
        {<Portal>
          <div style={truePos} onClick={(e)=>{this.dropListClick(e)}}>
            {isOpen && this.props.children}
          </div>
        </Portal>}
      </React.Fragment>
    );
  }
}

export default DropList;
