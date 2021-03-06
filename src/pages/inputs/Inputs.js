import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from '~c/Input';

class Inputs extends Component {
	
	state = {
		word: '',
		wordError:'',
		multi: 'Тултипы сделаны таким образом, что внутри может располагаться не только какой-то текст, а еще и react-компонент. То есть туда можно поместить разнообразную верстку. Тултип автоматически рассчитывает, где ему "выпадать", сверху, или снизу. Четыре примера-кнопки по краям демонстрируют это. Этот тултип демонстрирует как раз кастомный контент выпадающей подсказки: заголовок, бейдж, цитату, автора цитаты. и кастомный текст.',
		
	};
	
	getWord = (wrd) => {
		let word = wrd.toLocaleLowerCase('ru-RU');
		this.setState({word});
		if(word!=='' && word!=="Друг".toLocaleLowerCase('ru-RU')){
			this.setState({wordError: 'Неправильное слово, нужно набрать другое.'});
		}else{
			this.setState({wordError: null});
		}
	}
	getMulti = (text) => {
		this.setState({multi:text});
	}

	render() {
		return (
			<React.Fragment>
			
			<div className="inputs">
					<Input type="text" 
							name="word"
							required
							clearable
							label="Введите слово"
							value={this.state.word}
							onChange={this.getWord}
							onClear={()=>{this.setState({word:''})}}
							placeholder="Скажи слово друг и проходи" 
							error={this.state.wordError}/>
				
			</div>
			<div>	
				<h4>Multiline text field</h4>
				<Input type="text" 
							multiline
							maxHeight="200px"
							clearable
							name="multi"
							value={this.state.multi}
							onChange={this.getMulti}
							onClear={()=>{this.setState({multi:''})}}
							 />

			</div>
			</React.Fragment>
		)
	}
	
}

export default Inputs;