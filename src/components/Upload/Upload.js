import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
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
  
  addToFileList = (list) => {
    this.setState((prev)=>{
      let arr = [...prev.fileList, ...list].sort((a,b)=>{
        if(a.name>b.name) return 1
        else if(a.name<b.name) return -1
        else return 0
      });
      console.log('arr:',arr);
      return {fileList: arr}
    })
  }

  onDrop = (event) => {
    const dropZone = ReactDOM.findDOMNode(this.uploadContainerRef.current);
    event.preventDefault();
    dropZone.classList.remove('dragover');
    console.log(event);
    let files = event.dataTransfer.files;// [...event.dataTransfer.files];
  //  let files = event.originalEvent.dataTransfer.files;
    //sendFiles(files);
    console.log("files:",files);
  
    //this.addToFileList(files);
    this.setState((prev)=>{
      let arr = [...prev.fileList, ...files].sort((a,b)=>{
        if(a.name>b.name) return 1
        else if(a.name<b.name) return -1
        else return 0
      });
      console.log('arr:',arr);
      return {fileList: arr}
    })
  }

  fileInputRef = React.createRef();
  uploadContainerRef = React.createRef();

  componentDidMount(){
   // const { current: dropZone } = this.uploadContainerRef;
    const dropZone = ReactDOM.findDOMNode(this.uploadContainerRef.current);
console.log('dropZone',dropZone);
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

// dropZone.addEventListener('dragover', function() {
//  // dropZone.addClass('dragover');
// });
// dropZone.addEventListener('dragenter', function() {
//   //dropZone.addClass('dragover');
// });

// dropZone.addEventListener('dragleave', function(e) {
//   dropZone.removeClass('dragover');
// });
// dropZone.addEventListener('dragleave', function(e) {
//   let dx = e.pageX - dropZone.offset().left;
//   let dy = e.pageY - dropZone.offset().top;
//   if ((dx < 0) || (dx > dropZone.width()) || (dy < 0) || (dy > dropZone.height())) {
//        dropZone.removeClass('dragover');
//   };
// });
// dropZone.addEventListener('drop', function(e) {
//  // dropZone.removeClass('dragover');
//   let files = e.originalEvent.dataTransfer.files;
//   //sendFiles(files);
//   console.log("files:",files);
// });

//     ('drag dragstart dragend dragover dragenter dragleave drop', function(){
//       return false;
//  });

  // //var target = document.getElementById("your-files");
  // target.addEventListener("dragover", function(event) {
  //     event.preventDefault(); // отменяем действие по умолчанию
  // }, false);
  // target.addEventListener("drop", function(event) {
  //     // отменяем действие по умолчанию
  //     event.preventDefault();
  //     var i = 0,
  //      files = event.dataTransfer.files,
  //      len = files.length;
  //      for (; i < len; i++) {
  //           console.log("e!!!",event);
  //           console.log("Filename: " + files[i].name);
  //           console.log("Type: " + files[i].type);
  //           console.log("Size: " + files[i].size + " bytes");
  //      }
  // }, false);

  }

  handleSubmit=(event)=> {
  event.preventDefault();

  // console.log(this.fileInputRef.current.files)
  // console.log("prev",this.state.fileList);
  // console.log("new:",...this.fileInputRef.current.files);

  this.addToFileList(this.fileInputRef.current.files);


    // this.setState((prev)=>{
    //   let arr = [...prev.fileList, ...this.fileInputRef.current.files].sort((a,b)=>{
    //     if(a.name>b.name) return 1
    //     else if(a.name<b.name) return -1
    //     else return 0
    //   });
    //  //
    //   console.log('arr:',arr);
    //   return {fileList: arr}
    // })
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
            {i}: {item.name} 
            &nbsp;<span onClick={()=>this.onDelete(i)}>delete</span>
        </div>
      )}
    );
    const classes = classNames(
			"upload",
			className,
		);
    //console.log("children:",this.props.children, children);

    // let ch = React.Children.map(children, child => {
    //   return React.cloneElement(child, {onClick:(e)=>this.handleSubmit(e)})
    // })
    
    return (
      <React.Fragment>
        <label className="upload-container" ref={this.uploadContainerRef}  {...attrs} >
          <input type="file" ref={this.fileInputRef} onChange={this.handleSubmit} multiple />
          <div className={classes} >Нажмите для добавления файлов, или перетащите файлы мышью</div>
          {/* {children} */}
          {/* {ch} */}
        </label>
        <div className="upload-list-files">{list}</div> 
      </React.Fragment>
    );
  }
}

export default Upload;