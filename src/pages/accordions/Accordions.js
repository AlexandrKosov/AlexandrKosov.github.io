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

class Accordions extends Component{


    callback = () => {
        console.log('callback');
    }

    render(){
        
        return (
           <React.Fragment>
                <h1>Выпадающие блоки</h1>
				<Collapse defaultActiveKey={['1','3']} onChange={this.callback}>
                    <Panel header="This is panel header 1" key="1">
                    <p>{text}</p>
                    </Panel>
                    <Panel header={<strong><i>Заголовок выпадающего блока</i></strong>} key="2">
                    <p>{text}</p>
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
            </React.Fragment>
       )
    }
}
export default Accordions;