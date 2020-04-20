import React, {Component} from 'react';
import { Badge } from 'react-bootstrap';
import { urlBuilder } from '~/routes';
import { Link } from 'react-router-dom';

import Icon from '~c/Icon';

class Icons extends Component{

    constructor (props){
        super(props);
     
    };


    render(){
        return (
           <React.Fragment>
                <h1>Иконки</h1>
                <p>Иконки по умолчанию имеют размеры 16х16пикс. Размер можно кастомизировать с помощью атрибута SIZE,
                    который может быть как small|default|large, так и значение в px, em, rem.</p>
                <p>
                    <Icon name="plus"/>
                    <Icon name="ok"/>
                    <Icon name="maximize"/>
                    <Icon name="win"/>
                    <Icon name="cross" />
                    <Icon name="search" />
                    <Icon name="settings" />
                    <Icon name="delete" />
                    <Icon name="star" />
                </p>
                <p>Маленькие иконки, size="small"</p>
                <p>
                    <Icon name="plus" size="small"/>
                    <Icon name="ok" size='small'/>
                    <Icon name="maximize" size='small' />
                    <Icon name="win" size='small'/>
                    <Icon name="cross" size='small' />
                    <Icon name="search" size='small' />
                    <Icon name="settings" size='small' />
                    <Icon name="delete" size='small' />
                    <Icon name="star" size='small' />
                    <Icon name="dropdown" size='small' />
                    <Icon name="dropdown-up" size='small' />
                </p>
                <p>Большие иконки, size="large"</p>
                <p>
                    <Icon name="plus" size="large"/>
                    <Icon name="ok" size='large'/>
                    <Icon name="maximize" size='large' />
                    <Icon name="win" size='large'/>
                    <Icon name="cross" size='large' />
                    <Icon name="search" size='large' />
                    <Icon name="settings" size='large' />
                    <Icon name="delete" size='large' />
                    <Icon name="star" size='large' />
                </p>
                <p>Иконка размером 2rem</p>
                <p>
                    <Icon name="delete" size='2rem'/>
                    <Icon name="star" size='2rem' />
                </p>
                <p>Иконка размером 30px</p>
                <p>
                    <Icon name="delete" size='30px' />
                    <Icon name="star" size='30px' />
                </p>
                <p>Иконка размером 14px</p>
                <p>
                    <Icon name="delete" size='14px' />
                    <Icon name="star" size='14px' />
                </p>
            </React.Fragment>
       )
    }
}
export default Icons;