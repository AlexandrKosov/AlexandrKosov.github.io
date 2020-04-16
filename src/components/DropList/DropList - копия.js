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
    changeSelected: PropTypes.func
  };

  static defaultProps = {
    children: null,
    className: '',
    disabled: false,
    active: false,
    changeSelected: ()=>{}
  };

  state = {
    isOpen: false,
    selected: null,
    truePos: {}
  };

  dropHeadRef = React.createRef();
  dropdownRef = React.createRef();

  dropListClick = (e) => {
    //e.persist();
    this.setState((state)=>{
      return {isOpen: !state.isOpen}
    });
  };

  dropListItemClick = (e) => {
    e.persist();
    console.log(e, e.target);
    //let newSelected = e.target.innerHTML;
    let sel = (
      <div className="list-current-item" dangerouslySetInnerHTML={{__html: e.target.innerHTML}} />
    );
    this.setState((state)=>{
      return {
        isOpen: !state.isOpen,
        selected: sel,//newSelected
      }
    });
    // this.props.changeSelected(newSelected);
  };

  componentDidMount () {
    const { current: dropHead } = this.dropHeadRef;
    const {current: dropdown} = this.dropdownRef;

    //setTimeout(()=>{
      let head = dropHead.getBoundingClientRect();
      let drop = dropdown.getBoundingClientRect();
    
      let calc = window.innerHeight - head.bottom - drop.height;
      let truePos = {};
      if(calc > 0 ){
          truePos = {
          top: head.bottom + 'px',
          left: head.left + 'px',
          position: 'absolute',
          width: head.width + 'px',
        }
      } else {
          truePos = {
          bottom: window.innerHeight - head.top + 'px',
          left: head.left + 'px',
          position: 'absolute',
          width: head.width + 'px',
        }
      }    
      this.setState({truePos});
    //},0);
  }

  componentDidUpdate(){
    const { current: dropHead } = this.dropHeadRef;
    const {current: dropdown} = this.dropdownRef;

    setTimeout(()=>{
      let head = dropHead.getBoundingClientRect();
      let drop = dropdown.getBoundingClientRect();
    
      let calc = window.innerHeight - head.bottom - drop.height;
      let truePos = {};
      if(calc > 0 ){
          truePos = {
          top: head.bottom + 'px',
          left: head.left + 'px',
          position: 'absolute',
          width: head.width + 'px',
        }
      } else {
          truePos = {
          bottom: window.innerHeight - head.top + 'px',
          left: head.left + 'px',
          position: 'absolute',
          width: head.width + 'px',
        }
      }    
      this.setState({truePos});
    },0);
  }

  renderItems = () => {
    const { className, children, ...attrs } = this.props;
    const { selected } = this.state;
    //console.log(children);
    return children.map((child, index)=>(
        <ListItem
            key={index}
            index={index}
            disabled={child.props.disabled}
            className={classNames(child.props.className,(index==parseInt(selected))?'active':'')}
            onChangeActiveItem={this.changeActiveItem}
        >
            {child.props.children}
        </ListItem>
    ));
  }

  render() {
    const { className, disabled, active, getActiveItem } = this.props;
    const { isOpen, selected, truePos } = this.state;
    const classes = classNames(
      'drop-list',
      className,
      { disabled },
      { active },
    );
    const dropClasses = classNames("dropdown-list",isOpen?'':'hidden');

    return (
      <React.Fragment>
        <div className={classes} onClick={this.dropListClick} ref={this.dropHeadRef}>
          {selected || '—'}
        </div>
        {<Portal>
          <div className={dropClasses}
              ref={this.dropdownRef} 
              style={truePos} 
              onClick={this.dropListItemClick}>
            {/* {this.props.children} */}
            <List className="drop" selected='' getActiveItem={getActiveItem}>
              {this.renderItems()}
            </List>
          </div>
        </Portal>}
      </React.Fragment>
    );
  }
}

export default DropList;
