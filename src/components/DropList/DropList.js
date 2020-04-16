import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Portal from '~c/portal';

import ListItem from '~c/List/ListItem';
import './DropList.less';


class DropList extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        getActiveItem: PropTypes.func
    };
  
    static defaultProps = {
        children: null,
        className: '',
        getActiveItem: ()=>{}
    };
  
    constructor(props){
        super(props);
        this.state = {
            selected: props.selected?props.selected:null,
            isOpen: false,
            truePos: {}
        };
    }

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
      console.log('e', this, e.target);
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

    componentDidMount(){
        const { getActiveItem } = this.props;
        const { current: dropHead } = this.dropHeadRef;
        const {current: dropdown} = this.dropdownRef;

        if(this.state.selected){
            getActiveItem(this.state.selected);
        }
        //---------------
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
        //---------------  
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

    setActiveItem = (selectedIndex) => {
        const { className, children, ...attrs } = this.props;
        const { selected } = this.state;
        if (selected !== selectedIndex) {
          this.setState({
            selected: selectedIndex,
          });
          console.log("act:",children[selectedIndex]);
          this.state.zx = (React.cloneElement(children[selectedIndex]));
          //console.log('zx',zx);
          // let zx = children.filter((child)=>{
          //   //console.log('child:',child);  
          //   return child
          // });
        }
    }
    
    changeActiveItem = (activeIndex) =>{
        const { children, getActiveItem } = this.props;
        
        if(!children[activeIndex].props.disabled){
            this.setActiveItem(activeIndex);
            getActiveItem(activeIndex);
        }
    };

    renderItems = () => {
        const { className, children, ...attrs } = this.props;
        const { selected } = this.state;
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
        const { className, children, getActiveItem, onChangeActiveItem, ...attrs } = this.props;
        const { isOpen, selected, truePos } = this.state;
        const classes = classNames(
          'drop-list',
          className
        );
        const dropClasses = classNames("dropdown-list",isOpen?'':'hidden');
        return (
            <React.Fragment>

              <div className={classes} onClick={this.dropListClick} ref={this.dropHeadRef}>
                <div className="list-current-item">
                  {this.state.zx || '—'}
                </div>
              </div>
                {<Portal>
                  <div className={dropClasses}
                      ref={this.dropdownRef}
                      style={truePos} 
                      onClick={this.dropListItemClick}>
                      {this.renderItems()}
                  </div>
                </Portal>}
            </React.Fragment>    
        )
    }
	
};

export default DropList;