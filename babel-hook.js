
require("babel-register")({
    presets: [ 'env' ],
    plugins: ["syntax-object-rest-spread", "transform-regenerator"]
});

require("babel-polyfill");