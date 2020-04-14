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
  
    state = {
        selected: null,
    };

    renderItems = () => {
        const { className, children, ...attrs } = this.props;
        return children.map((child, index)=>(
            <ListItem
                key={index}
                index={index}
                disabled={child.props.disabled}
                className={child.props.className}
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
            <div className={classes} {...attrs}>
                {this.renderItems()}
                {/* {children} */}
            </div>
        )
    }
	
};

export default List;