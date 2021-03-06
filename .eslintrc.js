module.exports = {
    "parser": "babel-eslint",
    "rules": {
        "strict": 0
    },
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true
    },
    "rules": {
        "class-methods-use-this": [0],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/react-in-jsx-scope": "off",
        "arrow-body-style": [0]
    }
};