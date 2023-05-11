import html        from 'snabby';
import { toVNode } from 'snabbdom';

// content views
import Carousel from '../views/carousel/carousel.main.js';

// include all display types that will build content
const _displayTypes = {
    'Carousel': {
        implementation: Carousel,
    },
};


// main entry point for content
let _lastVnode = document.querySelector('#app-curious-content');

if (!_lastVnode) {
    _lastVnode = document.createElement('article');
    _lastVnode.id = 'app-curious-content';
    _lastVnode.classList.add('app-curious-content');
    document.body.append(_lastVnode);
}

_lastVnode = toVNode(_lastVnode);

// view model
const _model = {
    contentJson: null,
};

// snabby shadow dom control
const _update = () => {
    const newVode = view(_model, _update);
    _lastVnode = html.update(_lastVnode, newVode);
};


const view = (model, update) => {
    const { contentJson } = model;
    const content = contentJson.displayItems.map((item) => {
        const displayControl = _displayTypes[item.displayType];
        if (!displayControl)
            return html`<div>no display control for ${item.displayType}</div>`

        const contentModel = displayControl.implementation.init(item);

        return displayControl.implementation.view(contentModel, update);
    });

    return html`<article id="app-curious-content" class="app-curious-content"
        @key="app-curious-content">
        ${content}
    </article>`;
    
}

const main = async function (app) {
    try {
        // contentId could be used to retrieve the fresh data from a server
        // contentJson is the json that was used to create the existing display
        // if either of these are present, javascript will be enabled
        // const {contentJson, contentId } = app
        console.log('what is app ', app)
        _model.contentJson = app.contentJson;

        if (_model.contentJson) {
            _update();
        }


    } catch (ignore) {
        // no content provided        
        console.log('oops main error ', ignore)
    }

    
}


main(window.appcurious);
