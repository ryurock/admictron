var path = require('path');

module.exports = {
    entry: "./src/renderer-process/app.jsx", // どのjsファイルをルートにするか
    output: {
        path: __dirname + "/javascripts", // ファイルパス
        filename: "bundle.js", // ファイル名
        libraryTarget: 'commonjs2', // モジュールを呼ぶための方式を指定*1
    },
    target: "electron",
    module: {
        loaders: [ // loaderをカキカキ...
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: "/node_modules/",
                query: {
                    presets: ["es2015","react"] // es2015とreact使うよと...
                }
            }
        ]
    },
    externals: [ // こいつらは一つにしません！*2
      'electron',
      'fs'
    ],
    debug: true
};
