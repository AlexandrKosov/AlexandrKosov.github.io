import React, {Component} from 'react';
import Splitter from '~c/splitter';
import SplitterZone from '~c/splitter/SplitterZone';

const text1 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum molestie mollis lobortis. Morbi interdum nunc vel felis finibus fringilla. Praesent sollicitudin nisl vitae accumsan porttitor. Vivamus convallis, mauris quis vestibulum luctus, felis lacus pellentesque neque, et porta dolor felis in elit. Suspendisse ac nunc facilisis purus tincidunt tempus vel sit amet elit. Nunc a nisl vitae urna eleifend convallis eget quis erat. Praesent pellentesque nulla vitae lacus mattis imperdiet. Donec id mollis justo. Ut luctus turpis ut efficitur vehicula. Donec convallis arcu scelerisque metus lacinia, in molestie arcu imperdiet.
Aenean placerat mi velit, eu viverra metus iaculis nec. Nunc malesuada sapien ac ex aliquet facilisis. Cras varius accumsan sagittis. Quisque auctor mi id odio lobortis, a dignissim mi ultricies. Morbi semper porttitor lacus, quis vulputate leo sollicitudin quis. Curabitur suscipit justo at ligula dictum ultrices. Cras fermentum sit amet lacus ut pretium. Duis accumsan leo a nunc feugiat fermentum. Aenean congue interdum metus non consequat. Nulla facilisi. Phasellus massa ex, viverra non nisi scelerisque, porttitor lobortis nulla. Proin vehicula odio enim, eget pulvinar neque faucibus sit amet. Duis euismod ligula at ligula faucibus tempus. Etiam id mi dapibus, molestie felis iaculis, pretium lectus. In massa magna, mollis at purus vitae, cursus tincidunt velit. Sed ornare rutrum commodo. Aliquam et mollis tortor. Duis lacus orci, iaculis eget felis ac, sollicitudin dignissim elit. Vivamus sit amet quam placerat, volutpat risus quis, imperdiet orci. Pellentesque sit amet fermentum mauris.`;
const text2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec tempor ipsum, vitae molestie ligula. Etiam auctor risus augue, vel facilisis neque bibendum et. Nulla vitae egestas dolor. In blandit, tortor at lacinia ultrices, augue felis condimentum nulla, id euismod justo nunc ac nisl. Mauris porttitor nulla ut neque finibus, nec venenatis metus pharetra. Proin ut efficitur nisi. Morbi porta vehicula ante, id dictum leo finibus non. Nulla sit amet nulla lacus. Donec at iaculis elit. Fusce vehicula, sem ut interdum convallis, orci augue efficitur ligula, at tincidunt mauris odio in nunc. Proin vehicula, urna at bibendum consequat, lectus dui aliquet lectus, eget cursus diam dui ac odio. Nulla gravida placerat enim eu congue. Cras varius, nunc a tempus tempor, justo massa luctus nibh, id tincidunt metus erat vitae sapien. Praesent accumsan ornare nunc, sed efficitur augue imperdiet porta. Donec tristique, velit et mattis interdum, arcu nisl ultricies tortor, maximus bibendum purus risus eu ligula. Vivamus aliquam laoreet tortor, et maximus justo imperdiet sit amet. Donec fringilla scelerisque porttitor. Nullam lacinia ac lorem a lacinia. Sed non ipsum iaculis, faucibus diam vel, pellentesque nibh. Vivamus commodo, libero et ultricies tristique, risus quam fermentum est, et molestie magna lacus sit amet nisi. Praesent hendrerit nec mi ac commodo.`;

class Work extends Component{

    render(){
        
           return (
              <React.Fragment>
                 <Splitter vertical>
                   <SplitterZone minWidth="200px" width="50%">
                       <div className="fill-container" style={{overflowY:'auto', padding: '16px'}}>
                           {text1}
                       </div>
                   </SplitterZone>
                   <SplitterZone minWidth="200px">
                       <div className="fill-container" style={{overflowY:'auto', padding: '16px'}}>
                           {text2}
                       </div>
                   </SplitterZone>
                 </Splitter>      
              </React.Fragment>
          )
       }
}
export default Work;