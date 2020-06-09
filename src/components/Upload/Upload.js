import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import "regenerator-runtime/runtime";

import './Upload.less';

import Icon from '~c/Icon';

class Upload extends Component {
	static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onChange: PropTypes.func,
	};
	
	static defaultProps = {
    children: null,
    onChange: function(cnt){},
    className: ''
	};

	state = {
    fileList: []
  }
  
  addToFileList = (list) => {
    this.setState((prev)=>{
      let arr = [...prev.fileList, ...list].sort((a,b)=>{
        if(a.name>b.name) return 1
        else if(a.name<b.name) return -1
        else return 0
      });
    
      return {fileList: arr}
    });
    //console.log(">",this.fileInputRef.current.files = arr);
  }

  onDrop = async (event) => {
    const dropZone = ReactDOM.findDOMNode(this.uploadContainerRef.current);
    event.preventDefault();
    dropZone.classList.remove('dragover');
    let files = event.dataTransfer.files;

    await this.addToFileList(files);
    this.props.onChange(this.state.fileList); ///????
  }

  fileInputRef = React.createRef();
  uploadContainerRef = React.createRef();

  componentDidMount(){
    const dropZone = ReactDOM.findDOMNode(this.uploadContainerRef.current);

    dropZone.addEventListener("drag", function(event) {event.preventDefault()});
    dropZone.addEventListener("dragstart", function(event) {event.preventDefault()});
    dropZone.addEventListener("dragend", function(event) {event.preventDefault()});
    dropZone.addEventListener("dragover", function(event) {
      event.preventDefault();
      dropZone.classList.add('dragover');

    });
    dropZone.addEventListener("dragenter", function(event) {
      event.preventDefault();
      dropZone.classList.add('dragover');
    });
    dropZone.addEventListener("dragleave", function(e) {
      e.preventDefault();
      let dx = e.pageX - dropZone.offset().left;
      let dy = e.pageY - dropZone.offset().top;
      if ((dx < 0) || (dx > dropZone.width()) || (dy < 0) || (dy > dropZone.height())) {
          dropZone.classList.remove('dragover');
      };
    });

    dropZone.addEventListener("drop", this.onDrop);
  }

  handleChange = async (event) => {
    event.preventDefault();
    await this.addToFileList(this.fileInputRef.current.files);
    this.props.onChange(this.state.fileList);
  }

  onDelete = async (i) => {
    await this.setState((prev)=>{
        const idx = prev.fileList.findIndex((item, index)=>index===i);
        const fileList = [
          ...prev.fileList.slice(0,idx),
          ...prev.fileList.slice(idx+1)
        ];
        return { fileList }
    });
    
    await this.props.onChange(this.state.fileList);
    console.log(">>>",this.state.fileList)
    return i
  } 

  render() {
    const {children, className, ...attrs} = this.props;
    const {fileList} = this.state;
    let list = fileList.map((item,i)=>{
      return (
        <div key={i} className="upload-list-files__item">
            <div className="upload-list-files__name">{item.name} </div>
            <span className="upload-list-files__remove" onClick={()=>this.onDelete(i)}><Icon name="delete" /></span>
        </div>
      )}
    );
    const classes = classNames(
			"upload",
			className,
		);
    
    return (
      <React.Fragment>
        <label className="upload-container" ref={this.uploadContainerRef}  {...attrs} >
          <input type="file" ref={this.fileInputRef} onChange={this.handleChange} multiple name="attachment[]"/>
          <div className={classes} >
          <svg className="upload-file__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="12px" height="12px" style={{opacity:"0.5"}}>
            <path d="M286 384h-80c-14.2 1-23-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c11.6 11.6 3.7 33.1-13.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-23-23V366c0-13.3 10.7-24 24-24h136v8c0 31 24.3 56 56 56h80c30.9 0 55-26.1 57-55v-8h135c13.3 0 24 10.6 24 24zm-124 88c0-11-9-20-19-20s-19 9-20 20 9 19 20 20 21-9 20-20zm64 0c0-12-9-20-20-20s-20 9-19 20 9 20 20 20 21-9 20-20z">
            </path>
        </svg>
          Нажмите для добавления файлов, или перетащите файлы мышью</div>
        </label>
        <div className="upload-list-files">{list}</div> 
      </React.Fragment>
    );
  }
}

export default Upload;