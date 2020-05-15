import React, {Component} from 'react';
import Accordion from '~c/accordion';

class Accordions extends Component{


    render(){
        return (
           <React.Fragment>
                <h1>Аккордеон</h1>
				<Accordion />
            </React.Fragment>
       )
    }
}
export default Accordions;