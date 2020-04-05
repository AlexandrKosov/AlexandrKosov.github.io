import React from 'react';

import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import classNames from 'classnames';

class TabNav extends React.Component {

    tabRef = React.createRef();

    componentDidMount(){
        this.props.transferTabRefs(this.tabRef);
    }

    render(){
        const { navLabel, className, onChangeActiveTab, index } = this.props;
        return (
            <div ref={this.tabRef}
                className={classNames(className,'nav-item')}
                onClick={(e) => { onChangeActiveTab(e,index); }}>
                {navLabel}
            </div>
        ); 
    }
}

export default TabNav;
