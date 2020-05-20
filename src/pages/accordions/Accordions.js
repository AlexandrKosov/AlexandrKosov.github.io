import React, {Component} from 'react';
import Collapse from '~c/collapse';

const { Panel } = Collapse;

import Button from '~c/Button';
import Icon from '~c/Icon';
import Tag from '~c/tag';
import Badge from '~c/Badge';
import List from '~c/List';
import ListItem from '~c/List/ListItem';

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis in lacus sit amet suscipit. Aliquam accumsan, sapien id aliquam maximus, purus tellus sodales neque, a lobortis metus ipsum in turpis. Maecenas pulvinar ut sem quis ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec hendrerit neque sit amet tortor laoreet, quis imperdiet tortor placerat. Aliquam imperdiet nec leo non ultricies. Sed tincidunt hendrerit magna a varius. Donec aliquet mi lorem, vitae tempor mi commodo quis. Mauris aliquam risus nec leo semper mattis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean ac maximus purus, sit amet efficitur purus. Suspendisse posuere nulla a urna auctor, et pulvinar purus luctus. Maecenas malesuada urna at augue pretium finibus. Sed lacus lorem, vulputate ac purus pretium, consectetur pharetra turpis. Donec iaculis odio vitae ligula tristique porttitor. Aenean ut lacinia magna, et rutrum quam. Sed ut metus dolor. Aenean eu nisi nec urna iaculis cursus non et elit. Fusce accumsan volutpat euismod. Nulla viverra ipsum sit amet placerat porta. In fermentum euismod convallis. Curabitur volutpat sollicitudin diam eu suscipit. Proin eget tortor elementum, convallis augue eu, feugiat purus. Quisque vulputate convallis sem, nec convallis est vulputate a. Aenean iaculis sem ligula, id laoreet magna fermentum non. Morbi nec nunc ante. Praesent vulputate turpis quis erat gravida rutrum. Pellentesque quis tempor lectus. Nunc viverra quam odio, ut pretium eros dapibus vitae. Donec augue felis, tempus vitae posuere vel, fringilla et nisi. Sed elementum consectetur ipsum, et feugiat erat lobortis ac. Vivamus fringilla eleifend aliquam. Sed nisi orci, facilisis id nisl vel, suscipit tempus erat. Nunc quis mollis justo. Ut imperdiet mauris ut nisl fringilla mattis. Suspendisse a justo sollicitudin, consequat neque quis, rutrum odio. Sed auctor, felis sit amet pellentesque sagittis, metus nibh pellentesque ante, et sollicitudin nunc libero nec neque. Phasellus porttitor et lacus id efficitur. Vestibulum scelerisque risus sed est tristique auctor. Cras suscipit condimentum ex, vel ullamcorper metus gravida quis. Aenean at rutrum urna. Maecenas vel tincidunt ante, convallis pulvinar mi. Maecenas sollicitudin faucibus arcu at cursus. Curabitur mattis dignissim finibus. Duis non ex ex. Vestibulum ut venenatis velit. Aenean id arcu ante.';
class Accordions extends Component{


    callback = () => {
        console.log('callback');
    }

    render(){
        
        return (
           <React.Fragment>
                <h1>Выпадающие блоки</h1>
                 <h5>С ограничением выпадалки по высоте</h5>
				<Collapse defaultActiveKey={['1','3']} panelMaxHeight={150} onChange={this.callback}>
                    <Panel header="This is panel header 1" key="1">
                    <p>{text}</p>
                    </Panel>
                    <Panel header={<strong><i>Заголовок выпадающего блока</i></strong>} key="2">
                    <p>{longText}</p>
                    </Panel>
                    <Panel header={<React.Fragment><Icon name="settings" /> Lorem Ipsum <Badge variant="danger">New</Badge></React.Fragment>} key="3">
                    <div>
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="success">Success</Button>
                        <Button variant="warning">Warning</Button>
                        <Button variant="danger">Danger</Button>
                        <Button variant="info">Info</Button>
                        <Button variant="light">Light</Button>
                        <Button variant="dark">Dark</Button>
                        <Button variant="link">Link</Button>
                        <hr />
                        <List>
                            <ListItem><Icon name="search" />Найти</ListItem>
                            <ListItem><Icon name="settings"/>Настройки</ListItem>
                            <ListItem disabled><Icon name="delete"/>Удалить</ListItem>
                            <ListItem><Icon name="star" />Пункт со звёздочкой</ListItem>
                            <ListItem>Просто пункт с текстом</ListItem>
                        </List>
                    </div>
                    </Panel>
                    <Panel header={<React.Fragment><Icon name="star" /> Dolor sit amet <Badge pill variant="info">New</Badge></React.Fragment>} key="4">
                    <div>
                        <Tag label="какой-то тег" size="large" />
                        <Tag label="с иконкой" icon="star" size="large"/>
                        <Tag label="с кнопкой Закрыть" withClose size="large"/>
                        <hr />
                        <List>
                            <ListItem><Icon name="search" />Найти</ListItem>
                            <ListItem><Icon name="settings"/>Настройки</ListItem>
                            <ListItem disabled><Icon name="delete"/>Удалить</ListItem>
                            <ListItem><Icon name="star" />Пункт со звёздочкой</ListItem>
                            <ListItem>Просто пункт с текстом</ListItem>
                        </List>
                    </div>
                    </Panel>
                    
                </Collapse>
                <hr />
                <h5>Без ограничения выпадалки по высоте с Disabled-блоком</h5>
                <Collapse defaultActiveKey={[]} onChange={this.callback}>
                    <Panel header="В этой панели длинный текст" key="1">
                    <p>{longText}</p>
                    </Panel>
                    <Panel header="В этой панели не длинный текст" disabled key="2">
                    <p>{text}</p>
                    </Panel>
                </Collapse>    
            </React.Fragment>
       )
    }
}
export default Accordions;