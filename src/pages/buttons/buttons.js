import React, {Component} from 'react';
import { Badge } from 'react-bootstrap';
import { urlBuilder } from '~/routes';


import Icon from '~c/Icon';
import Button from '~c/Button';
import ButtonGroup from '~c/ButtonGroup';

class Buttons extends Component{

    state = {
        disabledButton: true
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
                    <Button icon="cross" 
                        variant="danger" 
                        disabled={this.state.disabledButton}
                        onClick={()=>{console.log("Disabled кнопка нажата!")}}> 
                        Disabled-кнопка
                    </Button>
                </p>
                <p>
                    <Button icon="star" 
                            variant="success" 
                            onClick={()=>{console.log("Success кнопка нажата!")}}> 
                            Success
                    </Button>
                    <Button icon="settings" 
                            variant="primary" 
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
                <h3>Группа кнопок</h3>
                
                <ButtonGroup>
                    <Button icon="star" toggled>Button</Button>
                    <Button icon="settings" toggled>Button</Button>
                    <Button icon="search" toggled>Button</Button>
                </ButtonGroup>
                
                <h3>Вертикальная группа кнопок</h3>
               
                <ButtonGroup vertical>
                    <Button icon="star" toggled>Button</Button>
                    <Button icon="settings" toggled>Btn</Button>
                    <Button icon="search" toggled>Long-long name Button</Button>
                </ButtonGroup>
                
			</React.Fragment>
       )
    }
}
export default Buttons;