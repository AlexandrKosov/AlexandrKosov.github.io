import React, {Component} from 'react';

import Tooltip from '~c/tooltip';

import  Icon  from '~c/Icon';
import  Badge  from '~c/Badge';
import Button from '~c/Button';

class Tooltips extends Component{

    constructor (props){
        super(props);
     
    };


    render(){
        const leftTop = {
            position: 'absolute',
            left: '10px',
            top: '10px'
        }
        const rightTop = {
            position: 'absolute',
            right: '10px',
            top: '10px'
        }
        const rightBottom = {
            position: 'absolute',
            right: '10px',
            bottom: '10px'
        } 
        const leftBottom = {
            position: 'absolute',
            left: '10px',
            bottom: '10px'
        }

    const lorem = (<div style={{width: '500px'}}>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.</div>);
    const ipsum = (<div style={{width: '800px'}}>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).</div>);

        return (
           <React.Fragment>
                <h1>Тултипы (всплывающие подсказки)</h1>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: "500px",
                    padding: '80px 100px'
                }} >
                Тултипы сделаны таким образом, что внутри может располагаться не только какой-то текст, а еще и react-компонент. 
                То есть туда можно поместить разнообразную верстку.
                Тултип автоматически рассчитывает, где ему "выпадать", сверху, или снизу. Четыре примера-кнопки по краям демонстрируют это.

                
{/* <Tooltip content={(<div><Icon name="star" size='small' />
                        проверка<Badge variant="secondary">New</Badge></div>)}>
                        <span style={rightTop}>right-top</span>
                        </Tooltip>  */}
 <Tooltip content={lorem}><Button style={leftTop} variant="primary">right-bottom</Button></Tooltip> 
 <Tooltip content={ipsum}><Button style={rightTop} variant="success">left-bottom</Button></Tooltip> 
 <Tooltip content={lorem}><Button style={rightBottom} variant="danger">right-bottom</Button></Tooltip> 
 <Tooltip content={ipsum}><Button style={leftBottom}variant="warning">left-bottom</Button></Tooltip> 


                </div>
				
        
            </React.Fragment>
       )
    }
}
export default Tooltips;