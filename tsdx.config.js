const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');

module.exports = {
    rollup(config, options) {
        config.plugins.push(
            postcss({
                modules: true,
            })
        );
        return config;
    },
};