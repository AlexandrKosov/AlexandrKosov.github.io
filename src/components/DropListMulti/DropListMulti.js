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
    //   this.setState((state)=>{
    //     return {
    //       isOpen: !state.isOpen,
    //     }
    //   });
    };

    componentDidMount(){
        const { getActiveItem } = this.props;
        const { current: dropHead } = this.dropHeadRef;
        const {current: dropdown} = this.dropdownRef;

        if(this.state.selected.length!=0){
            getActiveItem(this.state.selected);
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

    setActiveItem = (selectedIndex) => {
        const { className, children, ...attrs } = this.props;
        const { selected } = this.state;
        console.log('sel:', selectedIndex, selected);
    
//let array = [...mySet]; или Array.from(S);   array from Set
// new Set([iterable]);

        let set  = new Set(selected);
        if(set.has(selectedIndex)){
            set.delete(selectedIndex);
        }else{
            set.add(selectedIndex);
        }
        //console.log('has:', set.has(selectedIndex));
        console.log('set:',set);
        //let arr = Array.from(set);
        let arr = [...set];
       // console.log('new:', arr);
       this.setState({selected: arr});

//      console.log('-',selected.includes(selectedIndex));

        //console.log('ind:',selected.findIndex((el,index)=>{el[index]==selectedIndex}));
// let cur = children[selectedIndex]; console.log('a:',cur);

        // if (selected.includes(selectedIndex)) {
        //   this.setState((state)=>{
        //     selected: state.selected.push(selectedIndex)
        //   });
        //   this.current = (React.cloneElement(children[selectedIndex]));
        // } 

        // else {
        //     this.setState((state)=>{
        //     selected: state.selected.pop(selectedIndex)
        //   });
        // }
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
                tag='label'
                key={index}
                index={index}
                disabled={child.props.disabled}
                active={index==parseInt(selected[index])}
                className={classNames(child.props.className)}
                onChangeActiveItem={this.changeActiveItem}
            >
                <input type="checkbox" disabled={child.props.disabled} defaultChecked={index==parseInt(selected[index])} className="dropdown-check" />
                {child.props.children}
            </ListItem>
        ));
    }

    clearSelected = () => {
        const { getActiveItem } = this.props;
        this.setState({
            selected: [],
          });
          this.current = null;
          getActiveItem([]);
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
                <div className="list-current-item" onClick={this.dropListClick}>
                  {this.current || '—'}
                </div>
                <div className="dropdown-arrow" onClick={this.dropListClick}>    
                    {isOpen?<Icon name="dropdown-up" />:<Icon name="dropdown" />}
                </div>    
                {((selected.length!==0) && clearable) && <div className="list-clear-selected" onClick={this.clearSelected}>
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
                      <label className="all list-item"><input type="checkbox" name="check-all"  className="dropdown-check" />Выбрать все</label>
                  </div>
                </Portal>}
            </React.Fragment>    
        )
    }	
};

export default DropListMulti;