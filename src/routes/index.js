import Page404 from '~p/error404';
import Home from '~p/Home';

import Dialogs from '~p/dialogs';
import TabsView from '~p/TabsView';
import Icons from '~p/icons';
import Buttons from '~p/buttons';
import Tags from '~p/tags';
import Badges from '~p/badges';
import listView from '~p/listView';
import Tooltips from '~p/tooltips';
import Inputs from '~p/inputs';
import Splitters from '~p/splitters';
import SplitterVert from '~p/splitterVert';
import Accordions from '~p/accordions';

let routes = [
    {
        name: 'home',
        url: '/',
        component: Home,
        exact: true
    },
	
	{
        name: 'modals',
        url: '/modals',
        component: Dialogs,
        exact: true
    },
	{
        name: 'tabs',
        url: '/tabs',
        component: TabsView,
        exact: true
    },
	{
        name: 'icons',
        url: '/icons',
        component: Icons,
        exact: true
    },
	{
        name: 'buttons',
        url: '/buttons',
        component: Buttons,
        exact: true
    },
	{
        name: 'tags',
        url: '/tags',
        component: Tags,
        exact: true
    },
	{
        name: 'badges',
        url: '/badges',
        component: Badges,
        exact: true
    },
	{
        name: 'listView',
        url: '/list',
        component: listView,
        exact: true
    },
	{
        name: 'tooltips',
        url: '/tooltips',
        component: Tooltips,
        exact: true
    },        
	{
        name: 'inputs',
        url: '/inputs',
        component: Inputs,
        exact: true
    },
    {
        name: 'splitters',
        url: '/splitters',
        component: Splitters,
        exact: true
    },
	{
        name: 'splitterVert',
        url: '/splitter-vert',
        component: SplitterVert,
        exact: true
    },
	{
        name: 'accordions',
        url: '/accordions',
        component: Accordions,
        exact: true
    },
    {
        url: '**',
        component: Page404
    }
];

let routesMap = {};

routes.forEach((route) => {
    if(route.hasOwnProperty('name')){
        routesMap[route.name] = route.url;
    }
});

let urlBuilder = function(name, params){
    if(!routesMap.hasOwnProperty(name)){
        return null;
    }

    let url = routesMap[name];

    for(let key in params){
        url = url.replace(':' + key, params[key]);
    }

    return url;
}

export default routes;
export {routesMap, urlBuilder};