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

	onSubmit = (e) => {
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
//			console.log("+>",file.name, file);
			fData.append(file.name, file, file.name);
			console.log("*",fData.get(file.name));
		});

		console.log("fData:",fData);
		this.setState({fileList:[]});
		return false;
	}

	render() {
		return (
			<form onSubmit={this.onSubmit} >
				<Upload onChange={this.onChange}/>
				<input type="submit" value="Отправить" />
			</form>
			
		)
	}
	
}

export default UploadFiles;
