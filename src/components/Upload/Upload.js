import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import './Upload.less';

import Icon from '~c/Icon';

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
  
  addToFileList = (list) => {
    this.setState((prev)=>{
      let arr = [...prev.fileList, ...list].sort((a,b)=>{
        if(a.name>b.name) return 1
        else if(a.name<b.name) return -1
        else return 0
      });
      return {fileList: arr}
    })
  }

  onDrop = (event) => {
    const dropZone = ReactDOM.findDOMNode(this.uploadContainerRef.current);
    event.preventDefault();
    dropZone.classList.remove('dragover');
    let files = event.dataTransfer.files;

    this.addToFileList(files);
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

  handleSubmit=(event)=> {
    event.preventDefault();

    this.addToFileList(this.fileInputRef.current.files);

  }

  onDelete = (i) => {
    this.setState((prev)=>{
        const idx = prev.fileList.findIndex((item, index)=>index===i);
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
          <input type="file" ref={this.fileInputRef} onChange={this.handleSubmit} multiple />
          <div className={classes} >Нажмите для добавления файлов, или перетащите файлы мышью</div>
        </label>
        <div className="upload-list-files">{list}</div> 
      </React.Fragment>
    );
  }
}

export default Upload;