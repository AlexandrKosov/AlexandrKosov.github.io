import React, {Component} from 'react';
import { Badge } from 'react-bootstrap';
import { urlBuilder } from '~/routes';
import { Link } from 'react-router-dom';

import Modal from '~c/modal';
import Icon from '~c/Icon';
import Button from '~c/Button';

class Dialogs extends Component{

    constructor (props){
        super(props);
        this.state = {
         
            list: [
            ],
            isOpen: false, //открытие диалогового окна
            isOpenInner: false,
            isSecondOpen: false,
            disabledButton: true
        };
    };

    componentDidMount(){
      for(let i=0;i<3;++i){
        this.addToArray();
      }
    }

    addToArray = () => {
        let id = Math.floor(Math.random() * (1000 - 3) + 3);
        let name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
        let item = {
            name,
            id
        };
        this.setState((state)=>{list: state.list.push(item)});
        this.forceUpdate();
    };

      //функции управления диалоговым окном  
      openModal = () => {
        this.setState({ isOpen: true });
      }
    
      handleSubmit = () => {
        console.log('Submit function!');
        this.setState({ isOpen: false });
      }
    
      handleCancel = () => {
        console.log('Cancel function!');
        this.setState({ isOpen: false });
      }
      //функции управления диалоговым окном  
      openModalInner = () => {
        this.setState({ isOpenInner: true });
      }
    
      handleSubmitInner = () => {
        console.log('Submit function!');
        this.setState({ isOpenInner: false });
      }
    
      handleCancelInner = () => {
        console.log('Cancel function!');
        this.setState({ isOpenInner: false });
      }
      //функции управления диалоговым окном  
      openSecondModal = () => {
        this.setState({ isSecondOpen: true });
      }
    
      handleSecondSubmit = () => {
        console.log('Submit function!');
        this.setState({ isSecondOpen: false });
      }
    
      handleSecondCancel = () => {
        console.log('Cancel function!');
        this.setState({ isSecondOpen: false });
      }

    toggleDisabled = (e) => {
        this.setState((prevState)=>{
             const disabledButton = !prevState.disabledButton;
             return {disabledButton}
        });
    };

    render(){
        let {tabs} = this.state;
        
        let testObject = (<i>Example heading <Badge variant="secondary">New</Badge></i>);

		let list  = this.state.list.map((item)=>{
			return (<li key={item.name}>{item.name} -- {item.id}</li>)
		});

        return (
           <React.Fragment>
                <h1>Диалоговые окна</h1>
<p>Диалоговые окна могут перетаскиваться по экрану, могут масштабироваться, или раскрываться на весь экран.</p>
<p>Первое - просто диалоговое окно. С заданной шириной и автоматической по контенту высотой. </p>
<p>Второй диалог имеет кнопку добавления контента. При добавлении контента появляется вертикальная прокрутка.
  Это диалоговое окно может менять свои размеры: их можно изменять потянув за треугольник в правом нижнем углу.
  Диалоговое окно можно раскрыть на весь экран, для этого существует атрибут maximize, а в верхнем правом углу появляется кнопка раскрытия на весь экран. 
</p>
<p>Диалоговые окна содержат кнопки "вложенное диалоговое окно" с помощью которого можно открыть модалку второго уровня.</p>
                <Button onClick={this.openModal} className="button-success" icon="star"> Диалоговое окно</Button>
                <Button onClick={this.openSecondModal} className="button-primary" icon="settings">Второе диалоговое окно</Button>
                <Modal
                    caption="Первое диалоговое окно"
                    isOpen={this.state.isOpen}
                    onCancel={this.handleCancel}
                    onSubmit={this.handleSubmit}
                    width={760}
                    >
                    { testObject }
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <Button onClick={this.openModalInner}>Вложенное Диалоговое окно</Button>
                </Modal>
                <Modal
                    
                    caption="Второе диалоговое окно"
                    isOpen={this.state.isSecondOpen}
                    onCancel={this.handleSecondCancel}
                    onSubmit={this.handleSecondSubmit}
                    width={680}
                    resizeable
                    maximize
                    >
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p><Button onClick={this.addToArray}>добавить контент</Button></p>
                    <Button onClick={this.openModalInner}>Вложенное Диалоговое окно</Button>
                    {list}     
                </Modal>
                <Modal
                    caption="Вложенное диалоговое окно"
                    isOpen={this.state.isOpenInner}
                    onCancel={this.handleCancelInner}
                    onSubmit={this.handleSubmitInner}
                    height={450}
                    maximize
                    >
                    { testObject }
                    <p>огда курсор перемещается по экрану, компонент отображает его координаты (x, y) в p.
    Теперь возникает вопрос: как мы можем повторно использовать это поведение в другом компоненте? Другими словами, если другой компонент должен знать о позиции курсора, можем ли мы инкапсулировать это поведение таким образом, чтобы можно было легко поделиться им с этим компонентом?
    Поскольку компоненты являются базовой единицей повторного использования кода в React, попробуем немного отрефакторить код, чтобы использовать компонент Mouse, инкапсулирующий поведение, которое нам можно повторно использовать в любом другом месте.</p>
                </Modal>
               
              
			</React.Fragment>
       )
    }
}
export default Dialogs;