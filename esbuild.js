import esbuild            from 'esbuild';
import inlineImportPlugin from 'esbuild-plugin-inline-import';
import { globSync }       from 'glob';

import { dirname, sep }   from 'path';
import { fileURLToPath }  from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const plugins = [
    // Inline CSS and prepend license info
    inlineImportPlugin({
        filter: /^css:/,
    })

];

// using a naming convention to avoid node modules
// i was unable to run this in the app directory as esbuild was unable to resolve the paths
// let files = globSync('**/*.js', { cwd: __dirname + sep + 'app', ignore: `${__dirname}/build/**` });
let files = globSync('**/*.main.js', { cwd: __dirname, ignore: `${__dirname}/build/**`});

async function main () {
    await esbuild.build({
        entryPoints: files,
        outdir: 'build',
        outbase: 'app',

        outExtension: {
            '.js': '.min.mjs'
        },
        bundle: true,
        allowOverwrite: true,
        format: 'esm',
        target: 'es2017',

        plugins,
        

    });
}

main();
