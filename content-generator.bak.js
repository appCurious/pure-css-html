
// snabby requires a browser window
// but this is not working quite right to provide a global window object
global.window = {
    ResizeObserver: function () {
        return {
            observe: (vnode) => {},
            unobserve: (elm) => {}
        }
    }
};


// html render functions
import html       from 'snabby';
import fs         from 'fs';
import toHtml     from 'snabbdom-to-html';

// content views
import Carousel from './app/views/carousel/carousel.js';

// sample data
import sampleData from './app/models/sample-content/content-example.js';




const displayTypes = {
    'Carousel': {
        implementation: Carousel, 
        cssPath: './views/carousel/carousel.css'
    },
};


function generateDisplayContent (contentJson, styles, includeJavascript) {
    const displayControl = displayTypes[contentJson.displayType];
    styles.css += fs.readFileSync( displayControl.cssPath, 'utf-8');

    if (!displayControl)
        return html`<div>no display control for ${contentJson.displayType}</div>`

    const contentModel = displayControl.implementation.init(contentJson);

    return displayControl.implementation.view(contentModel);
}

function generateContentFromJson (contentJson, styles, includeJavascript) {

    const content = contentJson.displayItems.map((item) => {
        return generateDisplayContent(item, styles, includeJavascript);
    });

    return html`<article id="app-curious-content" class="app-curious-content">${content}</article>`;
}

async function createHTML (outputFilePath, contentJson, includeJavascript) {
    outputFilePath = outputFilePath || './export/pure-content.html';
    const rehydratableFile = './export/reydrate-content.html';
    const styles = {css: ''};
    
    try {
        contentJson = JSON.parse(contentJson);
    } catch (ignore) {
        // quietly ignore the parse exception
        // use the testing data
        contentJson = sampleData.content;
        contentJson.contentHeader = `${ignore}`;
    }

    // pure html css implementation
    let content = toHtml(generateContentFromJson(contentJson, styles, includeJavascript));
    content = `<style>${styles.css}</style>` + content;
    fs.writeFileSync(outputFilePath, content);

    let hydrateContent = `<!DOCTYPE HTML>
    <html>
        <head>
            <script type="module" src="../assets/rehydrate.js"></script>
        </head>
        <body>
            <main>
                <h1> Content has been updated with JavaScript </h1>

                <div class="rehydrate-content">
                    ${content}
                </div>
            </main>
        </body>
    </html>`;
    fs.writeFileSync(rehydratableFile, hydrateContent);

}

/**
 * 
 * list of command line flags
 * named flags with : will be parsed as key value pairs
 * named flags without : are acted upon as boolean true when present
 * 
 * process.argv [
 *      run,
 *      outfilepath:pathforoutput,
 *      contentjson:"{stringified-json}",
 *      javascript,
 * ]
 * 
 */
async function cliRun () {
    const args = process.argv.slice(2);
    if (args.includes('run')) {
        // parse cmd line flags
        const configs = {};
        args.forEach((flag) => {
            const pair = flag.split(':');
            configs[pair[0]] = pair[1] || true;
        });
        console.log(configs)
        await createHTML(configs.outfilepath, configs.contentjson, configs.javascript);
    }
}

await cliRun();

export default { createHTML };
