import React, {Component} from 'react';

import List from '~c/List';
import ListItem from '~c/List/ListItem';
import DropList from '~c/DropList';
import Icon from '~c/Icon';
import  Badge  from '~c/Badge';
import Button from '~c/Button';

class listView extends Component{

    state = {
        select: null
    };

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

    changeSelected = (selected) => {
        console.log("Выбранный пункт: ",selected);
        this.setState({select: selected});
    };

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
                    <List selected={1}>
                        <ListItem><Icon name="search" />Найти</ListItem>
                        <ListItem><Icon name="settings"/>Настройки</ListItem>
                        <ListItem disabled><Icon name="delete"/>Удалить</ListItem>
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
                  {/*<h2>Dropdown list</h2>
         
                    <DropList className="one" changeSelected={this.changeSelected}>
                        <List className="drop">
                            <ListItem data-id="1">Первый</ListItem>
                            <ListItem data-id="2">Второй</ListItem>
                            <ListItem data-id="3">Третий</ListItem>
                            <ListItem data-id="4">Четвертый</ListItem>
                            <ListItem data-id="5">Пятый</ListItem>
                            <ListItem data-id="6">Шестой</ListItem>
                            <ListItem data-id="7">Седьмой</ListItem>
                        </List> 
                    </DropList> */}
			</React.Fragment>

       )
    }
}
export default listView;