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
 
    };

    render() {
        const { className, children, ...attrs } = this.props;
        const classes = classNames(
        'list',
        className
        );
        return (
            <div className={classes} {...attrs}>
                {children}
            </div>
        )
    }
	
};

export default List;