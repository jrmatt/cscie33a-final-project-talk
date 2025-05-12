const path = require('path');

module.exports = {
    entry: './prompt_app/front_end/prompt_app/index.jsx',
    output: {
        filename: 'indexBundle.js', 
        path: path.resolve(__dirname, './prompt_app/static/prompt_app'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true,
                      },
                  },
            }, 
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
};