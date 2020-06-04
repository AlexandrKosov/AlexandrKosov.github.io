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
	}

    fileInput = React.createRef();
  
  handleSubmit=(event)=> {
	event.preventDefault();
	console.log(this.fileInput.current.files)
    alert(
      `Selected file - ${this.fileInput.current.files[0].name}`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} multiple/>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Upload;