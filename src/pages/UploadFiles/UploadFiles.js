import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Upload from '~c/Upload';
import Button from '~c/Button';

class UploadFiles extends Component {
	
	getFileList = (e) => {
		console.log(e);
		return e;
	}

	state = {
		fileList:[],
	}

	onChange = (value) => {
		console.log("val_____:",value);
		this.setState({fileList: value})
	}

	onSubmit = async (e) => {
		const {fileList} = this.state;
		e.preventDefault();
		// создание объекта FormData 
		let fData = new FormData();
/*
// HTML file input, chosen by user
formData.append("userfile", fileInputElement.files[0]);
*/
		fileList.forEach((file, index)=>{
			fData.append(`attachment[]`, file, file.name);
			//console.log("*",fData.get(`attachment`));
		});		
//---------------- обращение к серверу -------------------------------------------------------
let response = await fetch('http://angularhttp/upload.php', {
	method: 'POST',
	body: fData
  });
  //let result = await response.json();
console.log("resp:",response);
//-----------------------------------------------------------------------
  		this.setState({fileList:[]});
		return false;
	}

	render() {
		//console.log('this.state.fileList',this.state.fileList);
		return (
			<form onSubmit={this.onSubmit} >
				<Upload value={this.state.fileList.length} onChange={this.onChange}/>
				<input type="submit" value="Отправить" disabled={!this.state.fileList.length}/>
			</form>
			
		)
	}
	
}

export default UploadFiles;
