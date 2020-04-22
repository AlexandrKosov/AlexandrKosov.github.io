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
        clearable: PropTypes.bool
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
            
        };
    }
    current = null;//не в State, а как локальная переменная. т.к. выбранным пунктом управляет state.selected, а current просто хранит данные об текущем объекте для внутреннего пользования
    dropHeadRef = React.createRef();
    dropdownRef = React.createRef();

    dropListClick = (e) => {
      //e.persist();
      this.setState((state)=>{
        return {isOpen: !state.isOpen}
      });
    };

    dropListItemClick = (e) => {
      //e.persist();
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

        // if(this.state.selected){
        //     getActiveItem(this.state.selected);
        // } 
        if(selected){
           // getActiveItem(selected);

           this.setActiveItem(selected);
           this.current = (React.cloneElement(children[selected]));
           getActiveItem(selected);
        }
            
        setTimeout(()=>{
            let head = dropHead.getBoundingClientRect();
            let drop = dropdown.getBoundingClientRect();
            //this.updateDimensions();
            this.reCalcPosition(head, drop);
            window.addEventListener("resize", this.updateDimensions);
            document.addEventListener('click', this.handleClickOutside, false);
        },0); 
    }

    // componentDidUpdate(prevProps) {
    //     if(prevProps.selected !== this.props.selected) {
    //         getActiveItem(this.setActiveItem(activeIndex));
    //       // У this.props.myProp изменилось значение
    //       // Поэтому мы можем выполнять любые операции для которых
    //       // нужны новые значения и/или выполнять сайд-эффекты
    //       // вроде AJAX вызовов с новым значением - this.props.myProp
    //     }
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
        const { className, children, selected, ...attrs } = this.props;
        //const { selected } = this.state;
        if (selected !== selectedIndex) {
        //   this.setState({
        //     selected: selectedIndex,
        //   });
            this.current = (React.cloneElement(children[selectedIndex]));
            return selectedIndex;
        }
    }
    
    changeActiveItem = (activeIndex) =>{
        const { children, getActiveItem } = this.props;
        if(!children[activeIndex].props.disabled){
            // this.setActiveItem(activeIndex);
            // getActiveItem(activeIndex);
            getActiveItem(this.setActiveItem(activeIndex));
        }
    };

    renderItems = () => {
        const { className, children, selected, ...attrs } = this.props;
       //const {  } = this.state;
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
        const { isOpen, truePos } = this.state;
        const classes = classNames(
          'drop-list',
          className
        );
        const dropClasses = classNames("dropdown-list",isOpen?'':'hidden');
        console.log('_sel:',selected);
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
                {/* { (selected!==null || selected!==undefined)  && clearable && <div className="list-clear-selected" onClick={this.clearSelected}>
                    <Icon name="cross" size="small"/>
                </div>}  */}
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