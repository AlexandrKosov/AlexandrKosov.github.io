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
        selected: PropTypes.array
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
            selected: props.selected?props.selected:[],
            isOpen: false,
            truePos: {},
            
        };
    }
    current = null;//список выбранных элементов
    dropHeadRef = React.createRef();
    dropdownRef = React.createRef();

    dropListClick = (e) => {
      //e.persist();
      this.setState((state)=>{
        return {isOpen: !state.isOpen}
      });
    };

    componentDidMount(){
        const { getActiveItem } = this.props;
        const { selected=[] } = this.state;
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

    // componentDidUpdate(){
    //     this.updateCurrent(); 
    // }

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
        const { children } = this.props;
        const { selected } = this.state;
        let names = [];
        let selArr =arr? arr : selected;
        for(let i=0;i<selArr.length; ++i){
            names.push(children[selArr[i]].props.children);
        }
        this.current = [...names];
    }

    setActiveItem = (selectedIndex) => {
        const { className, children, ...attrs } = this.props;
        const { selected } = this.state;

        let set  = new Set(selected);

        if(set.has(selectedIndex)){
            set.delete(selectedIndex);
        }else{
            set.add(selectedIndex);
        }
        let arr = [...set];
        this.updateCurrent(arr); 
        this.setState({selected: arr});
    }
    
    changeActiveItem = (activeIndex) =>{
        const { children, getActiveItem } = this.props;
        const {selected} = this.state;

        if(!children[activeIndex].props.disabled){
            this.setActiveItem(activeIndex);
            getActiveItem(selected);//getActiveItem(activeIndex);
        }
    };

    renderItems = () => {
        const { className, children, ...attrs } = this.props;
        const { selected } = this.state;
        //console.log(selected);//2,4 третий, пятый
        let checked = false;
        return children.map((child, index)=>{// 0..6  3,5==disabled
            return (
            <ListItem
                tag='label'
                key={index}
                index={index}
                className={classNames(child.props.className, selected.includes(index)?'active':'')}
                // active={selected.includes(index)} - не работает, лучше передавать через className
                disabled={child.props.disabled}
                onChangeActiveItem={this.changeActiveItem}
            >
                {/* <input type="checkbox" onChange={(e,index)=>{this.handleCheck}} 
                        disabled={child.props.disabled} 
                        defaultChecked={selected.includes(index)} 
                        className="dropdown-check" /> */}
                {child.props.children}
            </ListItem>
        )
    }
    );
    }

    clearSelected = () => {
        const { getActiveItem } = this.props;
        this.current = [];
        getActiveItem([]);
        this.setState({
            selected: [],
        });
    }

    render() {
        const { className, children, getActiveItem, onChangeActiveItem, clearable, ...attrs } = this.props;
        const { isOpen, selected, truePos } = this.state;
        const classes = classNames(
          'drop-list',
          className
        );
        const dropClasses = classNames("dropdown-list dropdown-list-multiple",isOpen?'':'hidden');
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
                      {this.renderItems()}
                      <label className="list-item list-item_check-all">
                        {/* <input type="checkbox" name="check-all"  className="dropdown-check" /> */}
                        Выбрать все
                      </label>
                  </div>
                </Portal>}
            </React.Fragment>    
        )
    }	
};

export default DropListMulti;