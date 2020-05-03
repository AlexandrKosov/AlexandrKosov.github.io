import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from '~c/Input';

class Inputs extends Component {
	
	
	render() {
		const multiText = 'Тултипы сделаны таким образом, что внутри может располагаться не только какой-то текст, а еще и react-компонент. То есть туда можно поместить разнообразную верстку. Тултип автоматически рассчитывает, где ему "выпадать", сверху, или снизу. Четыре примера-кнопки по краям демонстрируют это. Этот тултип демонстрирует как раз кастомный контент выпадающей подсказки: заголовок, бейдж, цитату, автора цитаты. и кастомный текст.';
		return (
			<React.Fragment>
			
			<div className="inputs">
					<Input type="text" 
							name="word"
							required
							clearable
							label="Введите слово" 
							placeholder="Скажи слово друг и проходи" 
							error="Сообщение об ошибке!" />
				</div>
				<h4>Multiline text field</h4>
				<Input type="text" 
							multiline
							//rows="5"
							maxHeight="200px"
							clearable
							name="multi"
							defaultValue={multiText}
							 />

				
				<h2><span>1. Base Input type text:</span></h2>
    <Input name="text" type="text" />

    <h2><span>2. Input type number (with label):</span></h2>
    <Input name="number" label="select number" type="number" />

    <h2><span>3. Input type password (with error):</span></h2>
    <Input name="password" error="wrong password" type="password" />


			</React.Fragment>
		)
	}
	
}

export default Inputs;