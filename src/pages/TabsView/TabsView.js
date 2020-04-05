import React, {Component} from 'react';
import { Badge } from 'react-bootstrap';
import { urlBuilder } from '~/routes';
import { Link } from 'react-router-dom';

import Tabs from '~c/Tabs';
import TabItem from '~c/Tabs/TabItem.js';
import Icon from '~c/Icon';

class TabsView extends Component{

    constructor (props){
        super(props);
        this.state = {
            tabs: [
                {id:1, label: (<span> <Icon name="star" size="16px"/> Первый </span>) ,content:'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. '},
                {id:2, label:'Второй',content:'В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн.'},
                {id:3, label: (<span> <Icon name="delete" /> C Иконкой </span>) ,content:'Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.'},
                {id:4, label:'Четвертый',content:'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад.'},
                {id:5, label:'Пятый',content:'первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32'},
            ],
            
        };
    };

  


    render(){
        let {tabs} = this.state;
        let firstTabs = tabs.map(tab => (
            <TabItem key={tab.id} label={tab.label} selected={tab.selected}>{tab.content}</TabItem>
        ));
        let testObject = (<i>Example heading <Badge variant="secondary">New</Badge></i>);

        return (
           <React.Fragment>
                <h1>Табы</h1>
                <h3>Горизонтальные табы:</h3>
                <div style={{height: '360px'}}>
                    <Tabs animated selected={3}>
                        {firstTabs}
                    </Tabs>
                </div>
                <hr />
                <h3>Вертикальные табы:</h3>
                <div style={{height: '250px'}}>
                    <Tabs vertical animated>
                        <TabItem label="Simple text">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </TabItem>
                        <TabItem label={(<span>Парарам <Icon name="settings" /></span>)}>
                            <h3>Заголовок</h3>    
                            <p>Бsedrgsdgsrgsrty<b>hert</b>hyetyhtyjh</p>
                        </TabItem>
                        <TabItem label="Component">
                        rtyrtbuyn rtuy7 uy6j tyujn fgyjhn 578int5 y7uiryujn r
                        </TabItem>
                        <TabItem label={ testObject } >
                            { testObject }
                        </TabItem>
                    </Tabs>
                </div>
              
			</React.Fragment>
       )
    }
}
export default TabsView;