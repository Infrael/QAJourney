let mix = require('laravel-mix');

mix.setPublicPath('../public')
    .js('src/js/homePage.js', 'js')
    .js('src/js/login.js', 'js')
    
    .sass('src/css/homePage.scss', 'css')
    .sass('src/css/login.scss', 'css');