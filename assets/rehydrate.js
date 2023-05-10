import html     from 'snabby';
import MainView from '../views/main-view.js';

let lastVnode = document.querySelector('#app-curious-content');

const init = (configs) => {


};

const view = (model, update) => {

}

// snabby shadow dom control
const _update = () => {
    lastVnode = html.update(lastVnode, _update);
};