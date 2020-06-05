import React, {Component} from 'react';
//import {BrowserRouter as Router, Route, Switch, NavLink, Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import routes, { routesMap } from '~/routes';

class Home extends Component{

    render(){
        
           return (
              <React.Fragment>
                <h1>Главная страница</h1>
                  <ul className="list-group boxy">
                    <li className={`list-group-item`}>
                        <NavLink to={routesMap.home} exact activeClassName="active">
                            Home
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to={routesMap.modals} activeClassName="active">
                            Диалоговые окна
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to={routesMap.tabs} activeClassName="active">
                            Табы
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to={routesMap.icons} activeClassName="active">
                            Иконки
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to={routesMap.buttons} activeClassName="active">
                            Кнопки
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to={routesMap.tags} activeClassName="active">
                            Теги
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to={routesMap.badges} activeClassName="active">
                            Бейджи
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to={routesMap.listView} activeClassName="active">
                            Списки элементов
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to={routesMap.tooltips} activeClassName="active">
                          Тултипы
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to={routesMap.inputs} activeClassName="active">
                          Поля ввода
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to={routesMap.splitters} activeClassName="active">
                          Сплиттер гориз.
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to={routesMap.splitterVert} activeClassName="active">
                          Сплиттер вертик.
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to={routesMap.accordions} activeClassName="active">
                          Collapse
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to={routesMap.UploadFiles} activeClassName="active">
                          Загрузка файлов
                        </NavLink>
                    </li>
                </ul>

              </React.Fragment>
          )
       }
}
export default Home;