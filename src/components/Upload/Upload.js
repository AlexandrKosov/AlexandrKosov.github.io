import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Upload.less';

class Upload extends Component {
	static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
	};
	
	static defaultProps = {
    children: null,
    className: ''
	};

	state = {
    fileList: []
	}

    fileInput = React.createRef();
  
  handleSubmit=(event)=> {
  event.preventDefault();

  // console.log(this.fileInput.current.files)
  // console.log("prev",this.state.fileList);
  // console.log("new:",...this.fileInput.current.files);
    this.setState((prev)=>{
      let arr = [...prev.fileList, ...this.fileInput.current.files].sort((a,b)=>{
        if(a.name>b.name) return 1
        else if(a.name<b.name) return -1
        else return 0
      });
     //
      console.log('arr:',arr);
      return {fileList: arr}
    })
  }

  onDelete = (i) => {
    //console.log('deleting:',i);
    this.setState((prev)=>{
        const idx = prev.fileList.findIndex((item, index)=>index===i);
        //console.log('ind',idx);
        const fileList = [
          ...prev.fileList.slice(0,idx),
          ...prev.fileList.slice(idx+1)
        ];
        return { fileList }
    });
   
    return i
  } 

  render() {
    const {children, className, ...attrs} = this.props;
    const {fileList} = this.state;
    let list = fileList.map((item,i)=>{
      //console.log(item, i);
      return (
        <div key={i}>
            {item.name} 
            &nbsp;<span onClick={()=>this.onDelete(i)}>delete</span>
        </div>
      )}
    );
    //console.log("children:",this.props.children, children);

    let ch = React.Children.map(children, child => {
      return React.cloneElement(child, {onClick:(e)=>this.handleSubmit(e)})
    })
    
    return (
      <React.Fragment>
        <label {...attrs}>
          <input type="file" ref={this.fileInput} onChange={this.handleSubmit} multiple style={{display:'none'}}/>

          {/* {children} */}
          {ch}
        </label>
        <div className="upload-list-files">{list}</div> 
      </React.Fragment>
    );
  }
}

export default Upload;