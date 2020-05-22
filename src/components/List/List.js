import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ListItem from '~c/List/ListItem';
import './List.less';


class List extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        getActiveItem: PropTypes.func,
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
    };
   
    componentDidMount(){
        const { getActiveItem, selected } = this.props;
        if(selected){
            getActiveItem(selected);
        }
    }

    setActiveItem = (selectedIndex) => {
        const { selected } = this.props;
        if (selected !== selectedIndex) {
            return selectedIndex;
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
        const { className, children, selected, ...attrs } = this.props;
        return React.Children.map(children, (child, index)=>(
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

    render() {
        const { className, children, getActiveItem, ...attrs } = this.props;
        const classes = classNames(
        'list',
        className
        );
        return (
            <React.Fragment>
                <div className={classes} {...attrs}>
                    {this.renderItems()}
                </div>
            </React.Fragment>    
        )
    }
	
};

export default List;