import React, {Component} from 'react';
import Collapse from '~c/collapse';

const { Panel } = Collapse;

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

class Accordions extends Component{


    callback = () => {
        console.log('callback');
    }

    render(){
        
        return (
           <React.Fragment>
                <h1>Аккордеон</h1>
				<Collapse defaultActiveKey={['1']} onChange={this.callback}>
                    <Panel header="This is panel header 1" key="1">
                    <p>{text}</p>
                    </Panel>
                    <Panel header="This is panel header 2" key="2">
                    <p>{text}</p>
                    </Panel>
                </Collapse>
            </React.Fragment>
       )
    }
}
export default Accordions;