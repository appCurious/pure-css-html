import html from 'snabby';


// main entry point for content
let lastVnode = document.querySelector('#app-curious-content');

const init = (configs) => {


};

// snabby shadow dom control
const _update = (vnode) => {
    lastVnode = html.update(lastVnode, vnode);
};

const displayTypes = {
    'Carousel': {
        implementation: Carousel, 
        cssPath: './views/carousel/carousel.css'
    },
};


// function generateDisplayContent (contentJson, styles, update) {
//     const displayControl = displayTypes[contentJson.displayType];
//     styles.css += fs.readFileSync( displayControl.cssPath, 'utf-8');

//     if (!displayControl)
//         return html`<div>no display control for ${contentJson.displayType}</div>`

//     const contentModel = displayControl.implementation.init(contentJson);

//     return displayControl.implementation.view(contentModel, update);
// }

const view = (contentJson) => {
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