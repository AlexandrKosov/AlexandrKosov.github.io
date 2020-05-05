import React, {Component} from 'react';
import styles from './app.module.css';
import './app.less';
import {BrowserRouter as Router, Route, Switch, NavLink, Link} from 'react-router-dom';
import routes, { routesMap } from '~/routes';

class App extends Component{

    render(){
        let routesComponents = routes.map((route) => {
            return <Route path={route.url}
                          component={route.component}
                          exact={route.exact} 
                          key={route.url}
                    />;
        });

        return (
            <Router>
            <header>
                <div className="container">
                    <div className="row justify-content-between">
						<img src="../../assets/img/logo.png" />
					</div>
                </div>
            </header>
            <div className="container main"> 
            {/* d-flex align-items-stretch */}
                <div className="row">
                    <div className="col col-3">
{/*-------------------------------MENU------------------------*/}
                        <ul className="list-group">
                            <li className={`list-group-item ${styles.myItem}`}>
                                <NavLink to={routesMap.home} exact activeClassName={styles.active}>
                                    Home
                                </NavLink>
                            </li>
							
							<li className="list-group-item">
                                <NavLink to={routesMap.modals} activeClassName={styles.active}>
                                   Диалоговые окна
                                </NavLink>
                            </li>
							<li className="list-group-item">
                                <NavLink to={routesMap.tabs} activeClassName={styles.active}>
                                   Табы
                                </NavLink>
                            </li>
							<li className="list-group-item">
                                <NavLink to={routesMap.icons} activeClassName={styles.active}>
                                   Иконки
                                </NavLink>
                            </li>
							<li className="list-group-item">
                                <NavLink to={routesMap.buttons} activeClassName={styles.active}>
                                   Кнопки
                                </NavLink>
                            </li>
							<li className="list-group-item">
                                <NavLink to={routesMap.tags} activeClassName={styles.active}>
                                   Теги
                                </NavLink>
                            </li>
							<li className="list-group-item">
                                <NavLink to={routesMap.badges} activeClassName={styles.active}>
                                   Бейджи
                                </NavLink>
                            </li>
							<li className="list-group-item">
                                <NavLink to={routesMap.listView} activeClassName={styles.active}>
                                   Списки элементов
                                </NavLink>
                            </li>
							<li className="list-group-item">
                                <NavLink to={routesMap.tooltips} activeClassName={styles.active}>
                                  Тултипы
                                </NavLink>
                            </li>
                            <li className="list-group-item">
                                <NavLink to={routesMap.inputs} activeClassName={styles.active}>
                                  Поля ввода
                                </NavLink>
                            </li>
                            <li className="list-group-item">
                                <NavLink to={routesMap.splitters} activeClassName={styles.active}>
                                  Сплиттеры
                                </NavLink>
                            </li>
                        </ul>
{/*-------------------------------/MENU------------------------*/}						
                    </div>
                    <div className="col col-9">
                        <Switch>
                            {routesComponents}
                        </Switch>
                    </div>
                </div>
            </div>
            <footer>
                <div className="container">
                    Футер
                </div>
            </footer>    
            </Router>
        )
    }
}

export default App;