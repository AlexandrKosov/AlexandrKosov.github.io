import React, {Component} from 'react';
import { Badge } from 'react-bootstrap';
import { urlBuilder } from '~/routes';

import Icon from '~c/Icon';
import Tag from '~c/tag';

class Tags extends Component{

    state = {
        cities: [
            {name: 'Moscow'},
            {name: 'Saint-Petersburg'},
            {name: 'Ulianovsk'},
            {name: 'Kirov'},
            {name: 'Sevastopol'}
        ]
    };
  
    setCurrent = (id) => {
        this.setState(({ cities }) => ({
            cities: cities.map(({ name, active }) => {
              if (name === id) {
                active = !active;
              }
              return { name, active };
            }),
          }));
    }

    removeTag = (e, id) => {
        this.setState(({ cities }) => ({
            cities: cities.filter(({ name }) => name !== id),
        }));
    } 
    
    render(){
        const { cities } = this.state;
        const tagsList = cities.map(({name, active})=>{
            return (<Tag label={name} 
                key={name}
                id={name}
                icon='star'
                withClose
                className={active ? 'active' : ''}
                onClick={this.setCurrent}
                onCloseClick={this.removeTag}
            />)
        });

        return (
           <React.Fragment>
                <h1>Теги</h1>

                <h4>Теги стандартного размера:</h4>
                <Tag label="какой-то тег" />
                <Tag label="с иконкой" icon="star" />
                <Tag label="с кнопкой Закрыть" withClose />
                <p></p>
                <h4>Small-теги:</h4>
                <Tag label="какой-то тег" size="small"/>
                <Tag label="с иконкой" icon="star" size="small" />
                <Tag label="с кнопкой Закрыть" withClose size="small" />
                <p></p>
                <h4>Large-теги:</h4>
                <Tag label="какой-то тег" size="large" />
                <Tag label="с иконкой" icon="star" size="large"/>
                <Tag label="с кнопкой Закрыть" withClose size="large"/>
                <p></p>
                <h4>Рабочий пример. кликабельные удаляемые теги.</h4>
                {tagsList}
			</React.Fragment>
       )
    }
}
export default Tags;