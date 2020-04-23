import React, {Component} from 'react';

import List from '~c/List';
import ListItem from '~c/List/ListItem';
import DropList from '~c/DropList';
import DropListMulti from '~c/DropListMulti';
import Icon from '~c/Icon';
import  Badge  from '~c/Badge';
import Button from '~c/Button';

class listView extends Component{

    state = {
        select1: 3,
        select2: null,
        select3: null,
        select4: 3,
        select5: 1,
        select6: [1,5],
        select7: []
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
    //список с мультивыбором
    getActive6 = (selected) => {
        this.setState({select6: selected});
    }   
    getActive7 = (selected) => {
        this.setState({select7: selected});
    }
    customMultiListGeneration(count){
        let arr = [];
        for(let i=0;i<count;++i){
            arr.push((<ListItem disabled={i%10==0} key={i}>
                     Элемент №{i}
                  </ListItem>))
        };
        return arr;
    };

    render(){
        const customMultiList = this.customMultiListGeneration(25);
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


                    <DropListMulti selected={this.state.select6} getActiveItem={this.getActive6} clearable>
                            <ListItem disabled>Zero</ListItem>
                            <ListItem>Uno</ListItem>
                            <ListItem>Due</ListItem>
                            <ListItem>Tre</ListItem>
                            <ListItem >Quattro</ListItem>
                            <ListItem>Cinque</ListItem>
                            <ListItem>Sei</ListItem>
                            <ListItem>Sette</ListItem>
                            <ListItem disabled>Otto</ListItem>
                        </DropListMulti>



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

                <div style={{display: 'flex'}}>
                    <div style={{width: '45%', marginRight: '20px'}}>
                        <h2>Dropdown list  <i style={{fontSize: '14px'}}> выбран № {this.state.select3}</i></h2>
                        <DropList className="first" selected={this.state.select3}  getActiveItem={this.getActive3}>
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
                    </div>
                    <div>
                        <h2>Dropdown list Multiselect  </h2>
                        <div>
                            <i style={{fontSize: '14px'}}>
                                Выбранные: {this.state.select6.map((item, index)=>{return (<span key={item}>{item}, </span>)})}
                            </i>
                        </div>
                        <DropListMulti selected={this.state.select6} getActiveItem={this.getActive6} clearable>
                            <ListItem disabled>Zero</ListItem>
                            <ListItem>Uno</ListItem>
                            <ListItem>Due</ListItem>
                            <ListItem>Tre</ListItem>
                            <ListItem >Quattro</ListItem>
                            <ListItem>Cinque</ListItem>
                            <ListItem>Sei</ListItem>
                            <ListItem>Sette</ListItem>
                            <ListItem disabled>Otto</ListItem>
                        </DropListMulti>
                        <div>dropList с мультивыбором и автоматической высотой</div>
                        <DropListMulti selected={this.state.select7} getActiveItem={this.getActive7} clearable>
                            {customMultiList}
                        </DropListMulti>
                    </div>
                </div>


			</React.Fragment>

       )
    }
}
export default listView;