import React, {Component} from 'react';

import Tooltip from '~c/tooltip';

import  Icon  from '~c/Icon';
import  Badge  from '~c/Badge';

class Tooltips extends Component{

    constructor (props){
        super(props);
     
    };


    render(){
        return (
           <React.Fragment>
                <h1>Тултипы (всплывающие подсказки)</h1>
				
				Скажи <Tooltip content="парарарирам">слово</Tooltip> 
                <Tooltip content={(<div><Icon name="star" size='small' />проверка<Badge variant="secondary">New</Badge></div>)}>«друг»</Tooltip> и проходи.
				
            </React.Fragment>
       )
    }
}
export default Tooltips;