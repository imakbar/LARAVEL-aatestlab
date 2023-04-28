const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.webpackConfig({
    resolve: {
        extensions: [ '.vue', '.ts', '.js' ],
		alias: {
        	'@': __dirname + '/resources/js',
		}
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_module/,
                options: { appendTsSuffixTo: [/\.vue$/] }
            },
        ],
    },
});
mix.js('resources/js/app.ts', 'public/js')
    .vue()
    .sass('resources/sass/app.scss', 'public/css');
