
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
import Carousel from './build/views/carousel/carousel.main.min.mjs';

// sample data
import sampleData from './app/models/sample-content/content-example.js';

const displayTypes = {
    'Carousel': {
        implementation: Carousel, 
        cssPath: './views/carousel/carousel.css'
    },
};


function generateDisplayContent (contentJson) {
    const displayControl = displayTypes[contentJson.displayType];

    if (!displayControl) // for development
        return html`<div>no display control for ${contentJson.displayType}</div>`

    const contentModel = displayControl.implementation.init(contentJson);

    return displayControl.implementation.view(contentModel);
}

function generateContentFromJson (contentJson, styles) {

    const content = contentJson.displayItems.map((item) => {
        return generateDisplayContent(item, styles);
    });

    return html`<article id="app-curious-content" class="app-curious-content">${content}</article>`;
}

async function createHTML (outputFilePath, contentJson) {
    outputFilePath = outputFilePath || './export/pure-content.html';
    const jsEnabledFile = './export/jsenabled-content.html';
    const mainScriptFile = './build/views/main-view.main.min.mjs';
    
    try {
        contentJson = JSON.parse(contentJson);
    } catch (ignore) {
        // quietly ignore the parse exception
        // use the testing data
        contentJson = sampleData.content;
        // contentJson.contentHeader = `${ignore}`;
    }

    // pure html css implementation
    // toHTML converts single quotes and quotes to HTML characters...duh...should have expected that ;)
    let content = toHtml(generateContentFromJson(contentJson)).replace(/&#39;/g, "'").replace(/&quote;/g, '"');
    fs.writeFileSync(outputFilePath, content);

    const main = fs.readFileSync(mainScriptFile, {encoding: 'UTF8'});
    

    let jsEnabledContent = `<!DOCTYPE HTML>
    <html>
        <head>

        </head>
        <body>
            <main>
                <h1> Content has been updated with JavaScript </h1>

                <div class="rehydrate-content">
                    ${content}
                </div>
            </main>

            <!-- this avoids the need for a server, the content generator adds the json that was used to create the display content
                in a production environment we would call for the content
            -->
            <script>
                window.appcurious = {
                    contentJson: ${JSON.stringify(contentJson)}
                };
            </script>
            <!-- 
                script added here to avoid the need for a server for this experimentation
                  it could just as easily have been a url to a hosted script
            -->
            <script type="module">
                ${main}
            </script>
           
        </body>
    </html>`;
    fs.writeFileSync(jsEnabledFile, jsEnabledContent);

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
