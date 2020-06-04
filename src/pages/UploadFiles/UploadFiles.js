import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import InputFile from '~c/InputFile';

class UploadFiles extends Component {
	

	render() {
		return (
			<React.Fragment>
			
				<InputFile />
			</React.Fragment>
		)
	}
	
}

export default UploadFiles;