import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Upload from '~c/Upload';
import Button from '~c/Button';

class UploadFiles extends Component {
	
	state = {
		fileList:[],
	}

	onChange = (value) => {
		this.setState({fileList: value})
	}

	onSubmit = async (e) => {
		const {fileList} = this.state;
		e.preventDefault();
		// создание объекта FormData 
		let fData = new FormData();
		fileList.forEach((file, index)=>{
			fData.append(`attachment[]`, file, file.name);
		});		
//---------------- обращение к серверу -------------------------------------------------------
let response = await fetch('http://angularhttp/upload.php', {
	method: 'POST',
	body: fData
  });
  //let result = await response.json();
//-----------------------------------------------------------------------
  		this.setState({fileList:[]});
		return false;
	}

	render() {
		return (
			<form onSubmit={this.onSubmit} >
				<Upload value={this.state.fileList.length} onChange={this.onChange}/>
				<input type="submit" value="Отправить" disabled={!this.state.fileList.length}/>
			</form>
			
		)
	}
	
}

export default UploadFiles;
