import React, {Component} from 'react';
import { Badge } from 'react-bootstrap';
import { urlBuilder } from '~/routes';


import Icon from '~c/Icon';
import Button from '~c/Button';

class Buttons extends Component{

    constructor (props){
        super(props);
        this.state = {
            disabledButton: true
        };
    };

  

    toggleDisabled = (e) => {
        this.setState((prevState)=>{
             const disabledButton = !prevState.disabledButton;
             return {disabledButton}
        });
    };

    render(){

        return (
           <React.Fragment>
                <h1>Кнопки</h1>
                
                <p>
                    <Button icon="delete" toggled onClick={this.toggleDisabled} > Toggled-кнопка</Button>
                
                    {/* <Button icon="delete" toggled onClick={()=>{console.log('toggled!')}}> Toggled-кнопка</Button> */}
                    <Button icon="cross" 
                            className="button-danger" 
                            disabled={this.state.disabledButton}
                            onClick={()=>{console.log("Disabled кнопка нажата!")}}> 
                            Disabled-кнопка
                 </Button>
                </p>
                <p>
                    <Button icon="star" 
                            className="button-success" 
                            onClick={()=>{console.log("Success кнопка нажата!")}}> 
                            Success
                    </Button>
                    <Button icon="settings" 
                            className="button-primary" 
                            onClick={()=>{console.log("Primary кнопка нажата!")}}> 
                            Primary
                    </Button>
                    <Button icon="search" 
                            onClick={()=>{console.log("кнопка нажата!")}}> 
                            General
                    </Button>
                </p>
                <p>    
                    <Button onClick={()=>{console.log("кнопка нажата!")}}> 
                            Кнопка без иконки
                    </Button>
                    <Button onClick={()=>{console.log("кнопка нажата!")}}> 
                            <span>
                                Custom children
                                <span style={{borderLeft: '1px solid gray', paddingLeft:'8px', marginLeft: '8px'}}>10</span>
                            </span>
                    </Button>

                </p>
                <p>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="info">Info</Button>
                    <Button variant="light">Light</Button>
                    <Button variant="dark">Dark</Button>
                    <Button variant="link">Link</Button>
                </p>
			</React.Fragment>
       )
    }
}
export default Buttons;