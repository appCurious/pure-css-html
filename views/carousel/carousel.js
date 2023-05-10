/**
 * Carousel content has complications with a11y and accessibility considerations.
 *  without javascript it is difficult to set aria-hidden when content is out of view
 */


import html from 'snabby';


/**
 * 
 * @param {Object} config 
 * @param {Array} config.items
 * @returns model configurations consumed by view method to build html display
 */
const init = (config) => {
    const model = {
        items: config.items || [],
    };

    return model;

};

/**
 * 
 * @param {Object} model 
 * @param {Function} update optional function for refreshing html display
 * @returns html built from content model
 */
const view = (model, update) => {

    const contentSelectors = [], displayItems = [];

    if (!model.items?.length)
        return html`<div class="carousel-content"></div>`;

    let styles = '';

    model.items.forEach((item, idx) => {
        const nth = idx+1; // nth-of-type starts at 1
        contentSelectors.push(renderCarouselContentSelectors(nth, item));
        displayItems.push(renderContentDisplayItem(nth, item));

        
        /* unfortunately counters are not usable for comparison values
            and content: counter(c); is not a selectable attribute
            Not supported
                .carousel-content-selector-item[data-a=counter(selector-counter)]
                :is(.carousel-content-selector-container:has(.content-selector-item:nth-of-type(selector-counter):checked )

            which concludes that css would have to exist for every selector and every display item
            and the css would need to be produced by the content generator
        */
        styles += `
        :is(.content-selector-container:has(.content-selector-item:nth-of-type(${nth}):checked) + .content-display-container div.content-display-item:nth-of-type(${nth})) {
            left: 0px;
            opacity: 1;
        }
        `;
        /** Unexpected issues with quotes and single quotes being converted to &quote; &#39; */
        // styles += `
        // :is(.content-selector-container:has(.content-selector-item[data-selector='${nth}']:checked) + .content-display-container div.content-display-item:nth-of-type(1)) {
        //     left: 0px;
        //     opacity: 1;
        // }
        // `;

        

    });
    
    // const css = html`<style>${styles}</style>`;
    return html`<section class="carousel">
        <style>${styles}</style>
        <div class="carousel-header">
            ${model.caption}
        </div>
        <div class="carousel-content">
            <div class="content-selector-container">
                ${contentSelectors}
            </div>

            <div class="content-display-container">
               ${displayItems}
            </div>

        </div>
    </section>`;
};

function renderCarouselContentSelectors(idx, item) {
    const checked = idx === 1 ? 'checked' : '';

    return html`<input type="radio" class="content-selector-item" name="carousel-content-selection" data-selector="${idx}" tabindex="0" ${checked} />`;
}

function renderContentDisplayItem(idx, item) {
    if (item.type === 'Text')
        return html`<div class="content-display-item"> <div><p>${item.description}</p></div> </div>`;

    if (item.type === 'Image')
        return html`<div class="content-display-item"> <picture><image src="${item.asset.url}"></image></picture> </div>`;
}

export default { init, view };
