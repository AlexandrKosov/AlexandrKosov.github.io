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
        {icon:'cross',text:'Четвертый элемент',disabled: true,
            badge: {}
        },
        {icon:'ok',text:'пятый элемент', 
            badge: {}
        },
    ];

    // changeSelected = (selected) => {
    //     console.log("Выбранный пункт: ",selected);
    //     this.setState({select: selected});
    // };

    getActive = (index) => {
        this.setState({select: index});
    }


    render(){
        const custom = this.customData.map((item)=>{
            return (<ListItem className="list-item-flex" disabled={item.disabled} key={item.text}>
                <Icon name={item.icon} />
                <span className="flex-fill">{item.text}</span>
                <Badge variant={item.badge.variant}>{item.badge.name}</Badge>
                </ListItem>)
        });

        return (
           <React.Fragment>
                <h1>Списки</h1>
                <h3>Обычный список с иконками: <i> выбрано {this.state.select}</i></h3>
                <div style={{width: '300px'}}>
                {/* атрибут selected отсчитывается с НУЛЯ!!!!  */}
                    <List selected='3' getActiveItem={this.getActive}>
                        <ListItem><Icon name="search" />Найти</ListItem>
                        <ListItem><Icon name="settings"/>Настройки</ListItem>
                        <ListItem disabled><Icon name="delete"/>Удалить</ListItem>
                        <ListItem><Icon name="star" />Пункт со звёздочкой</ListItem>
                        <ListItem>Просто пункт с текстом</ListItem>
                    </List>
                </div>
                <h3>Кастомный список:</h3>
                <div style={{width: '300px'}}>
                    <List selected='1'>
                        {custom}
                    </List>
                </div>
                <h2>Dropdown list</h2>
                <DropList className="test" >
                    {/* <List className="drop"> */}
                        <ListItem>Первый</ListItem>
                        <ListItem>Второй</ListItem>
                        <ListItem>Третий</ListItem>
                        <ListItem>Четвертый</ListItem>
                        <ListItem>Пятый</ListItem>
                        <ListItem>Шестой</ListItem>
                        <ListItem>Седьмой</ListItem>
                    {/* </List>  */}
                </DropList>
			</React.Fragment>

       )
    }
}
export default listView;