import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '~c/Icon';
import Button from '~c/Button';
import Portal from '~c/portal';

import './modal.less';

class Modal extends Component {
  static propTypes = {
    caption: PropTypes.string, 
    isOpen: PropTypes.bool, 
    onCansel: PropTypes.func, 
    onSubmit: PropTypes.func,
    width:PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]), 
    height:PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    resizeable: PropTypes.bool,
    maximize: PropTypes.bool,
    borderedContent: PropTypes.string //scroll, none, always (только при скролле, никогда, всегда)
  };

  static defaultProps = {
    caption: "Модальное окно", 
    isOpen: false, 
    onCansel: () => {}, 
    onSubmit: () => {},
    width: null, 
    height: null,
    resizeable: false,
    maximize: false,
    borderedContent: 'scroll'
  };

  backWindow = {
    top: null,
    left: null,
    width: null,
    height: null
  };

  constructor (props){
    super(props);
    this.state = {
      width: props.width || '640px',
      height: props.height || 'auto',
      fullscreen: false
    }
  }

  draggableRef = React.createRef();
  modalRef = React.createRef();
  bodyRef = React.createRef();

  componentDidMount () {
    const { current: draggable } = this.draggableRef;
    const modal = draggable.parentNode;
    const overlay = modal.parentNode;

    setTimeout(()=>{
      let rect = modal.getBoundingClientRect();

      let startY = (overlay.getBoundingClientRect().height - modal.getBoundingClientRect().height)/2;
      modal.style.top = startY + 'px';

      if (this.state.width !== rect.width) {
        this.setState({width: rect.width});
      }
      if (this.state.height !== rect.height) {
        this.setState({height: rect.height});
      } 
    },0);
  }
  componentDidUpdate() {
    const {current: body} = this.bodyRef;
    this.checkForContentScroll(body);
  }

  onmousedown = (event) => {
    event.preventDefault();
    if(event.button == 0){
      const { current: draggable } = this.draggableRef;
      const modal = draggable.parentNode;
      const overlay = modal.parentNode;
      let shiftX = event.clientX - modal.getBoundingClientRect().left;
      let shiftY = event.clientY - modal.getBoundingClientRect().top;

      moveAt(event.clientX, event.clientY);

      function moveAt(pageX, pageY) {
        modal.style.left = pageX - shiftX + 'px';
        modal.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.clientX, event.clientY);
      }

      overlay.addEventListener('mousemove', onMouseMove);
      overlay.onmouseup = function() {
        overlay.removeEventListener('mousemove', onMouseMove); 
        modal.onmouseup = null;
      };
    }
  };
    
  ondragstart = () => {
    return false;
  };

  onResize = (event) => {
    const { width, height } = this.state;
    const that = this;
    event.preventDefault();
    if(event.button == 0){
       const {current: modal } = this.modalRef; 
       const overlay = modal.parentNode;

      let shiftX = event.clientX  - modal.getBoundingClientRect().width;
      let shiftY = event.clientY  - modal.getBoundingClientRect().height;
     
      function resizeAt(clientX, clientY) {
        modal.style.width = clientX - shiftX + 'px';
        modal.style.height = clientY - shiftY + 'px';
      }

      function onMouseMove(event) {
        resizeAt(event.clientX, event.clientY);
            const body = this.querySelector(".cos-modal-body");
            that.checkForContentScroll(body);
      }
      overlay.addEventListener('mousemove', onMouseMove);

      overlay.onmouseup = function() {
        overlay.removeEventListener('mousemove', onMouseMove); 
        modal.onmouseup = null;
      };
    }
  };

  checkForContentScroll = (body) => {
    const { borderedContent } = this.props;
    console.log("borderedContent",borderedContent);
    if(borderedContent==="scroll") {
      body.style.height = 'auto';
      let real = body.getBoundingClientRect().height;
      let fact = body.scrollHeight;
      if(real < fact) {
        body.classList.add("bordered");
      }else{
        body.classList.remove("bordered");
      }
    }else if (borderedContent === "always"){
      body.classList.add("bordered");
    }
    else if (borderedContent === "none") {
      return
    }
  }

  toggleMaximize = () => {  
    const {fullscreen} = this.state;
    const {current: modal } = this.modalRef; 
    if(fullscreen){
      modal.style.width = this.backWindow.width + "px";
      modal.style.height = this.backWindow.height + "px";
      modal.style.left = this.backWindow.left + "px";
      modal.style.top =  this.backWindow.top + "px";
      this.setState({fullscreen: false});
    }else if(!fullscreen){
      this.backWindow.width = modal.getBoundingClientRect().width;
      this.backWindow.height = modal.getBoundingClientRect().height;
      this.backWindow.top = modal.getBoundingClientRect().top;
      this.backWindow.left = modal.getBoundingClientRect().left;
      // modal.style.width = '100vw';
      // modal.style.height = '100vh';
      // modal.style.left = 0;
      // modal.style.top =  0;
      modal.style.width = 'calc(100% - 4px)';
      modal.style.height = 'calc(100% - 4px)';
      modal.style.left = '2px';
      modal.style.top = '2px';
      this.setState({fullscreen: true});
    }
  };

  render() {
    const {caption, isOpen, onCancel, onSubmit, resizeable, children, maximize } = this.props;
    const {width, height, fullscreen} = this.state;
    //значения ширины и высоты диалога по умолчанию
    const w = width || '640px';
    const h = height || 'auto';
    const startStyle = {
      width: w,
      height: h,
      left: "calc(50% - " + parseInt(w) / 2 + "px)",
    };
    const classes = classNames(
      'cos-modal',
      { 'open': isOpen }
    );
    
    const maximizeButton = 
            (<span className="cos-modal-maximize" onClick={this.toggleMaximize}>{fullscreen?<Icon name="maximize" />:<Icon name="win" />}</span>);
            // ❑ &#10065; \2751
            // ❒ &#10066;	\2752
    return (
      <React.Fragment>
        <Portal >
        <div className="cos-modal-overlay" style={isOpen? {visibility: 'visible'}:{visibility: 'hidden'}}>
          <div className={classes} style={startStyle} ref={this.modalRef}> 
            {maximize? maximizeButton:null}
            <span className="cos-modal-close" onClick={onCancel} ><Icon name="cross" /></span>
            <div className="cos-modal-header" ref={this.draggableRef} onMouseDown={this.onmousedown}>
              <div className="cos-modal-caption">{caption}</div>
              
            </div>
            <div className="cos-modal-body" ref={this.bodyRef}>
              {children}
            </div>
            <div className="cos-modal-footer">
              <Button onClick={onCancel} icon="cross">Отменить</Button>
              <Button onClick={onSubmit} icon="ok">ОК</Button>
            </div>
            {resizeable? <div className="cos-modal-resize" onMouseDown={this.onResize}></div> :null}  
          </div>
        </div>
      </Portal>
      </React.Fragment>
    )
  }
}

export default Modal;