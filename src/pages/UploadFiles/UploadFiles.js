import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Upload from '~c/Upload';
import Button from '~c/Button';

class UploadFiles extends Component {
	

	render() {
		return (
			
			
				<Upload>
					<Button>Upload</Button>
				</Upload>	
			
		)
	}
	
}

export default UploadFiles;