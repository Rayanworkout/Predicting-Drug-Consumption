CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    mode: 'production', //à changer en production pour le build

    plugins:[
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.(js|css|html|svg|jsx|json)$/,
            verbose:true,
            threshold: 0,
        }),
    ]
}