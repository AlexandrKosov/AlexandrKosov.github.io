import React, {Component} from 'react';
import  Badge  from '~c/Badge';

class Badges extends Component{


    render(){
        return (
            <React.Fragment>
                <h1>Бейджи</h1>
                



        <div>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="warning">Warning</Badge> 
        <Badge variant="info">Info</Badge>
        <Badge variant="light">Light</Badge> 
        <Badge variant="dark">Dark</Badge>
        </div>
        <div>
        <Badge pill variant="primary">
            Primary
        </Badge>
        <Badge pill variant="secondary">
            Secondary
        </Badge>
        <Badge pill variant="success">
            Success
        </Badge>
        <Badge pill variant="danger">
            Danger
        </Badge>
        <Badge pill variant="warning">
            Warning
        </Badge>
        <Badge pill variant="info">
            Info
        </Badge>
        <Badge pill variant="light">
            Light
        </Badge>
        <Badge pill variant="dark">
            Dark
        </Badge>
        </div>



            </React.Fragment>
       )
    }
}
export default Badges;