import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Portal from '~c/portal';

import ReactDOM from 'react-dom';

import ListItem from '~c/List/ListItem';
import './DropList.less';
import Icon from '~c/Icon';

class DropList extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        getActiveItem: PropTypes.func,
        clearable: PropTypes.bool,
        selected: PropTypes.oneOfType([
            PropTypes.number.isRequired,
            PropTypes.string.isRequired,
            PropTypes.oneOf([null]).isRequired,
        ])
    };
  
    static defaultProps = {
        children: null,
        className: '',
        getActiveItem: ()=>{},
        clearable: false
    };
  
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            truePos: {},
            trueHeight: {},
            fullHeight: null,
        };
    }
    current = null;
    dropHeadRef = React.createRef();
    dropdownRef = React.createRef();

    dropListClick = (e) => {
      this.setState((state)=>{
        return {isOpen: !state.isOpen}
      });
    };

    dropListItemClick = (e) => {
      this.setState((state)=>{
        return {
          isOpen: !state.isOpen,
        }
      });
    };

    componentDidMount(){
        const { getActiveItem, selected, children } = this.props;
        const { current: dropHead } = this.dropHeadRef;
        const {current: dropdown} = this.dropdownRef;
        const { fullHeight } = this.state;

        if(selected){
           this.setActiveItem(selected);
           this.current = (React.cloneElement(children[selected]));
           getActiveItem(selected);
        }

        setTimeout(()=>{
            let head = dropHead.getBoundingClientRect();
            let drop = dropdown.getBoundingClientRect();
            this.setState((prev)=>{
                if(drop.height !== prev.fullHeight){
                    return { fullHeight: drop.height};
                }
            });
            this.reCalcPosition(head, drop);
            window.addEventListener("resize", this.updateDimensions);
            document.addEventListener('click', this.handleClickOutside, false);
        },0);    
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
        document.removeEventListener('click', this.handleClickOutside, false);
    }
    
    updateDimensions = () => {
        const { current: dropHead } = this.dropHeadRef;
        const {current: dropdown} = this.dropdownRef;
        let head = dropHead.getBoundingClientRect();
        let drop = dropdown.getBoundingClientRect();
        this.reCalcPosition(head, drop);
    };

    reCalcPosition = (head, drop) => {
        const { fullHeight } = this.state;
        let maxDropHeight;
        let trueHeight;
        const calc = window.innerHeight - head.bottom - fullHeight;
        let bottom = (window.innerHeight - head.bottom > head.top);
        let truePos = {};
        
        if(calc > 0 ){
            truePos = {
                top: head.bottom + window.pageYOffset + 'px',
                left: head.left + 'px',
                position: 'absolute',
                width: head.width + 'px',
            };
          trueHeight = {maxHeight: 'none'}
        } else if(bottom) {
            truePos = {
                top: head.bottom + window.pageYOffset + 'px',
                left: head.left + 'px',
                position: 'absolute',
                width: head.width + 'px',
            };
          maxDropHeight = window.innerHeight - head.bottom;
          trueHeight = {maxHeight: maxDropHeight - 2 + 'px'}
        } else {
            truePos = {
                bottom: window.innerHeight - head.top - window.pageYOffset + 'px',
                left: head.left + 'px',
                position: 'absolute',
                width: head.width + 'px',
            };
            if(head.top > fullHeight){
                maxDropHeight = head.top;
                trueHeight = {maxHeight: 'none'}
            }else{
                maxDropHeight = head.top;
                trueHeight = {maxHeight: maxDropHeight - 2 + 'px'}
            }
        }  
        this.setState({truePos, trueHeight});
    };

    handleClickOutside = (e) => {
        // Получаем элемент, на который произведен клик https://archakov.im/post/detect-click-outside-react-component.html
        const domNode = ReactDOM.findDOMNode(this);
        // Проверяем, что элемент присутствует в переменной,
        // а также, является ли "domNode" узел потомком "event.target" узла.
        // Если не является, то скрываем элемент.
        if ((!domNode || !domNode.contains(e.target))) {
            this.setState({isOpen: false});
        }
    };

    setActiveItem = (selectedIndex) => {
        const { children, selected } = this.props;
        if (selected !== selectedIndex) {
            this.current = (React.cloneElement(children[selectedIndex]));
            return selectedIndex;
        }
    }
    
    changeActiveItem = (activeIndex) =>{
        const { children, getActiveItem } = this.props;
        if(!children[activeIndex].props.disabled){
            getActiveItem(this.setActiveItem(activeIndex));
        }
    };

    renderItems = () => {
        const { className, children, selected, ...attrs } = this.props;
        return children.map((child, index)=>(
            <ListItem
                key={index}
                index={index}
                disabled={child.props.disabled}
                active={index==parseInt(selected)}
                className={classNames(child.props.className)}
                onChangeActiveItem={this.changeActiveItem}
            >
                {child.props.children}
            </ListItem>
        ));
    }

    clearSelected = () => {
        const { getActiveItem } = this.props;
        this.current = null;
        getActiveItem(null);
    }

    render() {
        const { className, children, getActiveItem, onChangeActiveItem, clearable, selected, ...attrs } = this.props;
        const { isOpen, truePos, trueHeight  } = this.state;
        const classes = classNames(
          'drop-list',
          className
        );
        const dropClasses = classNames("dropdown-list",isOpen?'':'hidden');
        return (
            <React.Fragment>
              <div className={classes}  ref={this.dropHeadRef}>
                <div className="list-current-item" onClick={this.dropListClick}>
                  {this.current || '—'}
                </div>
                <div className="dropdown-arrow" onClick={this.dropListClick}>    
                    {isOpen?<Icon name="dropdown-up" />:<Icon name="dropdown" />}
                </div>    
                {(this.current && clearable) && <div className="list-clear-selected" onClick={this.clearSelected}>
                    <Icon name="cross" size="small"/>
                </div>}
              </div>
                {<Portal>
                  <div className={dropClasses}
                      ref={this.dropdownRef}
                      style={truePos} 
                      onClick={this.dropListItemClick}>
                      <div className="list-items-container" style={trueHeight}>
                        {this.renderItems()}
                      </div>
                  </div>
                </Portal>}
            </React.Fragment>    
        )
    }	
};

export default DropList;