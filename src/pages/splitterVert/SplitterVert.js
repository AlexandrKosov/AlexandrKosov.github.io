import React, {Component} from 'react';
import Splitter from '~c/splitter';
import SplitterZone from '~c/splitter/SplitterZone';
import './testSplitter.less';
import Input from '~c/Input';

const text2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec tempor ipsum, vitae molestie ligula. Etiam auctor risus augue, vel facilisis neque bibendum et. Nulla vitae egestas dolor. In blandit, tortor at lacinia ultrices, augue felis condimentum nulla, id euismod justo nunc ac nisl. Mauris porttitor nulla ut neque finibus, nec venenatis metus pharetra. Proin ut efficitur nisi. Morbi porta vehicula ante, id dictum leo finibus non. Nulla sit amet nulla lacus. Donec at iaculis elit. Fusce vehicula, sem ut interdum convallis, orci augue efficitur ligula, at tincidunt mauris odio in nunc. Proin vehicula, urna at bibendum consequat, lectus dui aliquet lectus, eget cursus diam dui ac odio. Nulla gravida placerat enim eu congue. Cras varius, nunc a tempus tempor, justo massa luctus nibh, id tincidunt metus erat vitae sapien. Praesent accumsan ornare nunc, sed efficitur augue imperdiet porta. Donec tristique, velit et mattis interdum, arcu nisl ultricies tortor, maximus bibendum purus risus eu ligula. Vivamus aliquam laoreet tortor, et maximus justo imperdiet sit amet. Donec fringilla scelerisque porttitor. Nullam lacinia ac lorem a lacinia. Sed non ipsum iaculis, faucibus diam vel, pellentesque nibh. Vivamus commodo, libero et ultricies tristique, risus quam fermentum est, et molestie magna lacus sit amet nisi. Praesent hendrerit nec mi ac commodo.`;

class SplitterVert extends Component{
	state = {
		word: '',
		wordError:'',
		word2: '',
        wordError2:'',
        multi: ''
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
    getWord2 = (wrd) => {
		let word = wrd.toLocaleLowerCase('ru-RU');
		this.setState({word2:word});
		if(word!=='' && word!=="Друг".toLocaleLowerCase('ru-RU')){
			this.setState({wordError2: 'Неправильное слово, нужно набрать другое.'});
		}else{
			this.setState({wordError2: null});
		}
    }
    getMulti = (text) => {
		this.setState({multi:text});
	}
    render(){
        
        const content1 = (
            <React.Fragment>
                <h6>Заголовок 1</h6>
                <Input type="text" 
                        name="word"
                        required
                        clearable
                        label="Введите слово"
                        placeholder="Скажи слово друг и проходи" 
                        value={this.state.word}
                        onChange={this.getWord}
                        error={this.state.wordError}
                        placeholder="Введите что-нибудь"/>
                <Input type="text" 
                        name="word2"
                        required
                        clearable
                        label="Введите слово"
                        placeholder="Скажи слово друг и проходи" 
                        value={this.state.word2}
                        onChange={this.getWord2}
                        error={this.state.wordError2}
                        placeholder="Введите что-нибудь ещё"/>        
                <h6>Заголовок 2</h6>
                <Input type="text" 
							multiline
							maxHeight="200px"
							clearable
							name="multi"
							value={this.state.multi}
							onChange={this.getMulti}
							onClear={()=>{this.setState({multi:''})}}
							 />
                <h6>Заголовок 3</h6>
        
            </React.Fragment>
        );
            return (
                <React.Fragment>
                    <Splitter vertical>
                    <SplitterZone minWidth="200px" maxWidth="350px">
                        <div className="fill-container" style={{overflowY:'auto', padding: '16px'}}>
                            {content1}
                        </div>
                    </SplitterZone>
                    <SplitterZone minWidth="200px">
                        <div className="fill-container" style={{overflowY:'auto', padding: '16px'}}>
                           
                            
                            <table className="test-table">
                                <thead>
                                    <tr>
                                        <th>Первый</th>
                                        <th>Второй</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>One</td>
                                        <td>Раз</td>
                                    </tr>
                                    <tr>
                                        <td>Due</td>
                                        <td>Два</td>
                                    </tr>
                                    <tr>
                                        <td>Tre</td>
                                        <td>Три</td>
                                    </tr>
                                    <tr>
                                        <td>Quattro</td>
                                        <td>Четыре</td>
                                    </tr>
                                    <tr>
                                        <td>Cinque</td>
                                        <td>Пять</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">Вышел зайчик погулять</td>
                                    </tr>
                                </tbody>
                            </table>
                            {text2}
                        </div>
                    </SplitterZone>
                    </Splitter>      
                </React.Fragment>
            )
       }
}
export default SplitterVert;