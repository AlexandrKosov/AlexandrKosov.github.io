import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Upload.less';

class Upload extends Component {
	static propTypes = {

	};
	
	static defaultProps = {

	};

	state = {
    fileList: []
	}

    fileInput = React.createRef();
  
  handleSubmit=(event)=> {
	event.preventDefault();
  console.log(this.fileInput.current.files)
  console.log("prev",this.state.fileList);
  console.log("new:",...this.fileInput.current.files);
    this.setState((prev)=>{
      let arr = [...prev.fileList, ...this.fileInput.current.files];
     //
      console.log('arr:',arr);
      return {fileList: arr}
    })
  }

  onDelete = (i) => {
    console.log('deleting:',i);
    this.setState((prev)=>{
        const idx = prev.fileList.findIndex((item, index)=>index===i);
        console.log('ind',idx);
        const fileList = [
          ...prev.fileList.slice(0,idx),
          ...prev.fileList.slice(idx+1)
        ];
        return { fileList }
    });
   
    return i
  } 

  render() {
    const {fileList} = this.state;
    let list = fileList.map((item,i)=>{
      console.log(item, i);
      return (
        <div key={i}>
            {item.name} 
            &nbsp;<span onClick={()=>this.onDelete(i)}>delete</span>
        </div>
      )}
    )
    return (
      <React.Fragment>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} onChange={this.handleSubmit} multiple/>
        </label>
        <div>{list}</div> 
      </React.Fragment>
    );
  }
}

export default Upload;