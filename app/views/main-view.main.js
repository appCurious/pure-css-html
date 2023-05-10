import html        from 'snabby';
import { toVNode } from 'snabbdom';

// content views
import Carousel from '../views/carousel/carousel.main.js';




// include all display types that will build content
const displayTypes = {
    'Carousel': {
        implementation: Carousel,
    },
};


// main entry point for content
let lastVnode = toVNode(document.querySelector('#app-curious-content'));

const init = (configs) => {


};

// snabby shadow dom control
const _update = (vnode) => {
    newVode = view()
    lastVnode = html.update(lastVnode, vnode);
};


const view = (contentJson, includeJavasript) => {
    const content = contentJson.displayItems.map((item) => {
        const displayControl = displayTypes[item.displayType];
        if (!displayControl)
            return html`<div>no display control for ${item.displayType}</div>`

        const contentModel = displayControl.implementation.init(item);

        return displayControl.implementation.view(contentModel, _update);
    });

    // return html`<article id="app-curious-content" class="app-curious-content">
    //     ${content}
    // </article>`;
    _update(content);
}

export default { init, view };
