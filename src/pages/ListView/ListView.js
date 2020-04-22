import React, {Component} from 'react';

import List from '~c/List';
import ListItem from '~c/List/ListItem';
import DropList from '~c/DropList';
import Icon from '~c/Icon';
import  Badge  from '~c/Badge';
import Button from '~c/Button';

class listView extends Component{

    state = {
        select1: 3,
        select2: null,
        select3: null,
        select4: 3,
        select5: 1
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

    //первый список
    getActive = (index) => {
        this.setState({select1: index});
    }
    //второй список
     getActive2 = (index) => {
        this.setState({select2: index});
    }
    //третий список
    getActive3 = (index) => {
        this.setState({select3: index});
    }
    //четвертый список
    getActive4 = (index) => {
        this.setState({select4: index});
    }
    //пятый список
    getActive5 = (index) => {
        this.setState({select5: index});
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
                <div style={{display: 'flex'}}>
                    <div style={{width: '45%', marginRight: '20px'}}>
                        <h3>Обычный список с иконками:</h3>
                        <div style={{width: '300px'}}>
                        {/* атрибут selected отсчитывается с НУЛЯ!!!!  */}
                            <List selected={this.state.select1} getActiveItem={this.getActive}>
                                <ListItem><Icon name="search" />Найти</ListItem>
                                <ListItem><Icon name="settings"/>Настройки</ListItem>
                                <ListItem disabled><Icon name="delete"/>Удалить</ListItem>
                                <ListItem><Icon name="star" />Пункт со звёздочкой</ListItem>
                                <ListItem>Просто пункт с текстом</ListItem>
                            </List>
                        </div>
                        <i style={{fontSize: '14px'}}> выбран № {this.state.select1}</i>
                    </div>
                    <div>    
                        <h3>Кастомный список:</h3>
                        <div style={{width: '300px'}}>
                            <List selected={this.state.select2} getActiveItem={this.getActive2}>
                                {custom}
                            </List>
                        </div>
                        <i style={{fontSize: '14px'}}> выбран № {this.state.select2}</i>
                    </div>    
                </div>
                <h2>Dropdown list  <i style={{fontSize: '14px'}}> выбран № {this.state.select3}</i></h2>
                <DropList className="first" getActiveItem={this.getActive3} clearable>
                        <ListItem><Icon name="search" />Первый</ListItem>
                        <ListItem>Второй<Badge variant="success" style={{marginLeft: '10px'}}>OK</Badge></ListItem>
                        <ListItem>Третий</ListItem>
                        <ListItem>Четвертый</ListItem>
                        <ListItem>Пятый</ListItem>
                        <ListItem>Шестой</ListItem>
                        <ListItem>Седьмой</ListItem>
                </DropList>
                <br /><i style={{fontSize: '14px'}}> выбран № {this.state.select4}</i>
                <DropList className="second" selected={this.state.select4} getActiveItem={this.getActive4} clearable>
                        <ListItem><Icon name="search" />Найти</ListItem>
                        <ListItem><Icon name="settings"/>Настройки</ListItem>
                        <ListItem disabled><Icon name="delete"/>Удалить</ListItem>
                        <ListItem><Icon name="star" />Пункт со звёздочкой</ListItem>
                        <ListItem>Просто пункт с текстом</ListItem>
                </DropList>
                 <br /><i style={{fontSize: '14px'}}> выбран № {this.state.select5}</i>
                <DropList className="third" selected={this.state.select5} getActiveItem={this.getActive5} clearable>   
                    {custom}
                </DropList>


			</React.Fragment>

       )
    }
}
export default listView;