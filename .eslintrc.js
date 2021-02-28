module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
      test: /\.js$/,
　　　　　　// 如果你的这个js文件在node_modules里面，就不使用babel-loader了
　　　　　　exclude: /node_modules/,
　　　　　　use: ['babel-loader', 'eslint-loader'],
    }
};
