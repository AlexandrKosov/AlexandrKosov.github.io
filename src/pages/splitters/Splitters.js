import React, {Component} from 'react';

import Splitter from '~c/splitter';
import SplitterZone from '~c/splitter/SplitterZone';

class Splitters extends Component {


    render(){
     
        return (
           <React.Fragment>
              <Splitter horizontal>
                <SplitterZone>
                    Трам-тарарам!
                </SplitterZone>
                <SplitterZone>
                    Тыдыщ-тыщ-тыщ!
                </SplitterZone>
              </Splitter>      
           </React.Fragment>
       )
    }
}
export default Splitters;