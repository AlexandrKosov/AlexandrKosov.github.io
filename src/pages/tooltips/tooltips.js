import React, {Component} from 'react';

import Tooltip from '~c/tooltip';

import  Icon  from '~c/Icon';
import  Badge  from '~c/Badge';
import Button from '~c/Button';

class Tooltips extends Component{

    constructor (props){
        super(props);
     
    };


    render(){
        const rightTop = {
            background: 'red',
            position: 'absolute',
            right: '10px',
            top: '10px'
        }
        const rightBottom = {
            background: 'red',
            position: 'absolute',
            right: '10px',
            bottom: '10px'
        } 
        const leftBottom = {
            background: 'red',
            position: 'absolute',
            left: '10px',
            bottom: '10px'
        }
        return (
           <React.Fragment>
                <h1>Тултипы (всплывающие подсказки)</h1>
				<p>
                    Скажи <Tooltip content="парарарирам">слово</Tooltip> 
                    {/* <Tooltip content={(<div><Icon name="star" size='small' />
                        проверка<Badge variant="secondary">New</Badge></div>)}>«друг»
                    </Tooltip> 
                    и проходи. */}
                </p>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: "500px",
                    border: '1px dashed lightgreen',
                }} >
                
<Tooltip content={(<div><Icon name="star" size='small' />
                        проверка<Badge variant="secondary">New</Badge></div>)}>
                        <span style={rightTop}>right-top</span>
                        </Tooltip> 
 <Tooltip content="парарарирам"><button style={rightBottom}>right-bottom</button></Tooltip> 
 <Tooltip content="парарарирам"><button style={leftBottom}>left-bottom</button></Tooltip> 


                </div>
				
        
            </React.Fragment>
       )
    }
}
export default Tooltips;