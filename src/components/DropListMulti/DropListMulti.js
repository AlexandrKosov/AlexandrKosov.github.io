import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Portal from '~c/portal';

import ReactDOM from 'react-dom';

import ListItem from '~c/List/ListItem';
import './DropListMulti.less';
import Icon from '~c/Icon';

class DropListMulti extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        getActiveItem: PropTypes.func,
        clearable: PropTypes.bool,
        selected: PropTypes.array.isRequired
    };
  
    static defaultProps = {
        children: null,
        className: '',
        getActiveItem: ()=>{},
        clearable: false,
        selected: []
    };
  
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            truePos: {},
        };
    }
    current = null;//список выбранных элементов
    dropHeadRef = React.createRef();
    dropdownRef = React.createRef();

    dropListClick = (e) => {
      this.setState((state)=>{
        return {isOpen: !state.isOpen}
      });
    };

    componentDidMount(){
        const { getActiveItem } = this.props;
        const { current: dropHead } = this.dropHeadRef;
        const {current: dropdown} = this.dropdownRef;

        this.updateCurrent(); 

        setTimeout(()=>{
            let head = dropHead.getBoundingClientRect();
            let drop = dropdown.getBoundingClientRect();
            //this.updateDimensions();
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
    };

    handleClickOutside = (e) => {
        const {current: dropdown} = this.dropdownRef;
        // Получаем элемент, на который произведен клик https://archakov.im/post/detect-click-outside-react-component.html
       const domNode = ReactDOM.findDOMNode(this);
        // Проверяем, что элемент присутствует в переменной,
        // а также, является ли "domNode" узел потомком "event.target" узла.
        // Если не является, то скрываем элемент.
        if ((!domNode || !domNode.contains(e.target) && !dropdown.contains(e.target))) {
            this.setState({isOpen: false});
        }
    };

    updateCurrent = (arr) => {
        const { children, selected } = this.props;
        let names = [];
        let selArr =arr? arr : selected;
        for(let i=0;i<selArr.length; ++i){
            names.push(children[selArr[i]].props.children);
        }
        this.current = [...names];
    }

    changeActiveItem = (activeIndex) =>{
        const { children, getActiveItem, selected } = this.props;
        if(!children[activeIndex].props.disabled){ 
            getActiveItem(this.setActiveItem(activeIndex));      
        };
       // this.updateDimensions();
    };

    setActiveItem = (selectedIndex) => {
        const { className, children, selected, ...attrs } = this.props;
        let set  = new Set(selected);

        if(set.has(selectedIndex)){
            set.delete(selectedIndex);
        }else{
            set.add(selectedIndex);
        }
        let arr = [...set];
        this.updateCurrent(arr); 
        return arr;
    }
    
    renderItems = () => {
        const { className, children, selected, ...attrs } = this.props;
        return children.map((child, index)=>(
            <ListItem
                key={index}
                index={index}
                className={classNames(child.props.className, selected.includes(index)?'active':'')}
                // active={selected.includes(index)} - не работает, лучше передавать через className
                disabled={child.props.disabled}
                onChangeActiveItem={this.changeActiveItem} >
                {child.props.children}
            </ListItem>
        ));
    }

    selectAll = () => {
        const { className, children, selected,getActiveItem, ...attrs } = this.props;   
        let notDisabledItems = children.filter((el)=>!el.props.disabled).length;
        if(selected.length !== notDisabledItems){ //не все выбраны
            let all = [];
            children.map((child, index)=>{
                if(!child.props.disabled){
                   all.push(index); 
                }
            });
            this.updateCurrent(all); 
            getActiveItem(all);
        }
        else {// выбраны все, нужно отключить 
            this.clearSelected();
        }
    };

    clearSelected = () => {
        const { getActiveItem } = this.props;
        this.current = [];
        getActiveItem([]);
    }

    checkAll(){
        const { className, children, selected, getActiveItem, ...attrs } = this.props; 

        let notDisabledItems = children.filter((el)=>!el.props.disabled).length;
        
        if(selected.length === 0){
            return '';
        } else if(selected.length !== notDisabledItems){ //не все выбраны
            return 'partly';
        } else {
            return 'full'
        }
    }

    render() {
        const { className, children, getActiveItem, onChangeActiveItem, clearable,selected, ...attrs } = this.props;
        const { isOpen,truePos } = this.state;
        const classes = classNames(
          'drop-list',
          className
        );
        const dropClasses = classNames("dropdown-list dropdown-list-multiple",isOpen?'':'hidden');
        const checkSelectAll = classNames(
            'list-item',
            'list-item_check-all',
            this.checkAll()
        );
        return (
            <React.Fragment>

              <div className={classes}  ref={this.dropHeadRef}>
                <div className="list-selected-items" onClick={this.dropListClick}>
                  {(this.current && this.current.length)? this.current.join(', ') :'—'}
                </div>
                <div className="dropdown-arrow" onClick={this.dropListClick}>    
                    {isOpen?<Icon name="dropdown-up" />:<Icon name="dropdown" />}
                </div>    
                {((this.current!==null && this.current.length!==0) && clearable) && <div className="list-clear-selected" onClick={this.clearSelected}>
                    <Icon name="cross" size="small"/>
                </div>} 
              </div>
                {<Portal>
                  <div className={dropClasses}
                      ref={this.dropdownRef}
                      style={truePos} 
                      onClick={this.dropListItemClick}
                      >
                      <div className="list-items-container">
                        {this.renderItems()}
                      </div>
                      <div className={checkSelectAll} onClick={this.selectAll}>
                        Выбрать все
                      </div>
                  </div>
                </Portal>}
            </React.Fragment>    
        )
    }	
};

export default DropListMulti;