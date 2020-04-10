import React, {Component} from 'react';

import List from '~c/List';
import ListItem from '~c/List/ListItem';

class listView extends Component{
  
    render(){
        return (
           <React.Fragment>
                <h1></h1>
                <h3>:</h3>
               
               <List>
                    <ListItem>1</ListItem>
                    <ListItem>2</ListItem>
                    <ListItem>3</ListItem>
               </List>
              
			</React.Fragment>
       )
    }
}
export default listView;