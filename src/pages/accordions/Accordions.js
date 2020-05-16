import React, {Component} from 'react';
import Collapse from '~c/collapse';

const { Panel } = Collapse;

const text = "Какой-то текст";

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