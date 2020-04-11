import React, {Component} from 'react';

import List from '~c/List';
import ListItem from '~c/List/ListItem';

import Icon from '~c/Icon';
import  Badge  from '~c/Badge';
import Button from '~c/Button';

class listView extends Component{

    customData = [
        {icon:'search',text:'Первый элемент',
            badge: {name:'!!!', variant:'danger'}
        },
        {icon:'star',text:'Второй элемент с длинным текстом',
        badge: {name:'Длинная метка', variant:'warning'}
    },
        {icon:'search',text:'Третий элемент',
        badge: {}
    },
    ];

    render(){

        const custom = this.customData.map((item)=>{
             return (<ListItem className="list-item-flex" key={item.text}>
                <Icon name={item.icon} />
                <span className="flex-fill">{item.text}</span>
                <Badge variant={item.badge.variant}>{item.badge.name}</Badge>
                </ListItem>)
        });

        return (
           <React.Fragment>
                <h1>Списки</h1>
                <h3>Обычный список с иконками:</h3>
                <div style={{width: '300px'}}>
                    <List>
                        <ListItem><Icon name="search" />Найти</ListItem>
                        <ListItem><Icon name="settings" />Настройки</ListItem>
                        <ListItem><Icon name="delete" />Удалить</ListItem>
                        <ListItem><Icon name="star" />Пункт со звёздочкой</ListItem>
                        <ListItem>Просто пункт с текстом</ListItem>
                    
                    </List>
                </div>
                <h3>Кастомный список:</h3>
                <div style={{width: '300px'}}>
                    <List>
                        {custom}
                    </List>
                </div>
                 
			</React.Fragment>

       )
    }
}
export default listView;