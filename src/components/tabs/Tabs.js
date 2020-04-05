import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TabNav from './TabNav';

import './tabs.less';

class Tabs extends Component {
  static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      vertical: PropTypes.bool,
      selected: PropTypes.number
  };

  static defaultProps = {
      children: null,
      className: '',
      vertical: false,
      selected: 0
  };

  state = {
      activeTabIndex: this.props.selected?this.props.selected:1,
      tabs: []
  }

  incBarRef = React.createRef();

  componentDidMount() {
    const { children = [] } = this.props;
    const { tabs = [], activeTabIndex } = this.state;
    let aTab = null;      //ссылка на активный таб
    let selIndex = activeTabIndex - 1; //selIndex = индекс массива, поэтому с нуля!
    aTab = tabs[selIndex].current;//tabs[selIndex] ? tabs[selIndex].current: tabs[0].current;//либо имеющий параметр selected, либо первый    
    this.setState({
        activeTabIndex: selIndex
    });
    this.drawIncBarLine(aTab);
  }

  setActiveTab = (selectedIndex) => {
    const { activeTabIndex } = this.state;
    if (activeTabIndex !== selectedIndex) {
      this.setState({
          activeTabIndex: selectedIndex,
      });
    }
  }

  transferTabRefs = (node) => {
    this.state.tabs.push(node);
  }

  changeActiveTab = (e, activeTabIndex) => {
      this.setActiveTab(activeTabIndex);
      this.drawIncBarLine(e.currentTarget);
  }

  drawIncBarLine(activeTab){
    if(!this.props.vertical){
       if (activeTab){
        const parentNode = activeTab? activeTab.parentNode:null;
        const parent = parentNode.getBoundingClientRect();
        const element = activeTab.getBoundingClientRect();
        const x = element.left - parent.left;
        const width = element.right - element.left;
        this.incBarRef.current.style.transform = `translate3d(${x}px, 0px, 0px)`;
        this.incBarRef.current.style.width = `${width}px`;
      }
    }else{
       if (activeTab){
        const parentNode = activeTab? activeTab.parentNode:null;
        const parent = parentNode.getBoundingClientRect();
        const element = activeTab.getBoundingClientRect();
        const x = element.top - parent.top;
        const height = element.bottom - element.top;
        this.incBarRef.current.style.transform = `translateY( ${x}px )`;
        this.incBarRef.current.style.height = `${height}px`;
      }      
    }
  }  

  getChildrenLabels = children => children.map(({ props }) => {
    return props.label
  })

  renderTabs = () => {
    const { children = [] } = this.props;
    const { activeTabIndex } = this.state;

    return this.getChildrenLabels(children).map((navLabel, ind) => (
      <TabNav
        index={ind} 
        key={ind}
        navLabel={navLabel}
        className={classNames({ active: activeTabIndex === ind })}
        transferTabRefs={this.transferTabRefs}
        onChangeActiveTab={this.changeActiveTab}
      />
    ));
  }

  renderActiveItem = () => {
    const { children = [] } = this.props;
    const { activeTabIndex } = this.state; 
    let i=0;   
    return React.Children.map(children, child => {
      i+=1;  
      return React.cloneElement(child,{index: i, active: activeTabIndex+1});
    })
  }

  render() {
    const { activeTabIndex } = this.state;
    const {
      children, className, vertical, animated, ...attrs
    } = this.props;
    const classes = classNames(
      'tabs',
      className,
      { vertical },
      { animated }
    );

    return (
      <div className={classes} {...attrs}>
        <div className="tab-nav">
          {this.renderTabs()}
          <div className="tab-nav-inc-bar" ref={this.incBarRef}/>
        </div>
        <div className="tab-container">
          {this.renderActiveItem()}
        </div>
      </div>
    );
  }
}

export default Tabs;
