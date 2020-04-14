import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ListItem from '~c/List/ListItem';
import './List.less';


class List extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string
    };
  
    static defaultProps = {
        children: null,
        className: ''
    };
  
    constructor(props){
        super(props);
        this.state = {
            selected: props.selected?props.selected:null,
        };
    }
    

    setActiveItem = (selectedIndex) => {
        const { selected } = this.state;
        if (selected !== selectedIndex) {
          this.setState({
            selected: selectedIndex,
          });
        }
    }

    changeActiveItem = (activeIndex) =>{
        const { children } = this.props;
        if(!children[activeIndex].props.disabled)
            this.setActiveItem(activeIndex);
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
        const { className, children, ...attrs } = this.props;
        const classes = classNames(
        'list',
        className
        );
        return (
            <React.Fragment>
                <div className="debug">{this.state.selected}</div>
                <div className={classes} {...attrs}>
                    {this.renderItems()}
                    {/* {children} */}
                </div>
            </React.Fragment>    
        )
    }
	
};

export default List;