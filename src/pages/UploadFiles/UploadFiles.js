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
		fileList:[]
	}

	onChange = (value) => {
		console.log("val:",value);
		this.setState({fileList: value})
	}

	onSubmit = async (e) => {
		const {fileList} = this.state;
		e.preventDefault();
		// создание объекта FormData 
		let fData = new FormData();
		//let fData = this.state.fileList;
		console.log(fileList);
/*
// HTML file input, chosen by user
formData.append("userfile", fileInputElement.files[0]);
*/
		fileList.forEach((file)=>{
			fData.append('attachment', file, file.name);
			console.log("*",fData.get(file.name));
		});
		console.log("fData:",fData);
		this.setState({fileList:[]});
//-----------------------------------------------------------------------

let response = await fetch('http://angularhttp/upload.php', {
	method: 'POST',
	body: fData	//new FormData(formElem)
  });

  let result = await response.json();

  alert(result.message);


//-----------------------------------------------------------------------
		return false;
	}

	render() {
		console.log('this.state.fileList',this.state.fileList);
		return (
			<form onSubmit={this.onSubmit} >
				<Upload value={this.state.fileList} onChange={this.onChange}/>
				<input type="submit" value="Отправить" />
			</form>
			
		)
	}
	
}

export default UploadFiles;
