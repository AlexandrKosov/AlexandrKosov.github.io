import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from '~c/Input';

class Inputs extends Component {
	
	
	render() {
		
		return (
			<React.Fragment>
				<div className="inputs">
					<Input />
				</div>
			</React.Fragment>
		)
	}
	
}

export default Inputs;