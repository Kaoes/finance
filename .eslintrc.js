// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2017,
        generators: true
    },
    env: {
        node: true
    },
    extends: [],
    plugins: [],
    rules: {
        'generator-star-spacing': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'comma-dangle': [
            'error',
            {
                arrays: 'never',
                objects: 'never',
                imports: 'never',
                exports: 'never',
                functions: 'never'
            }
        ],
        'comma-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        'comma-style': ['error', 'last'],
        indent: ['error', 4, { SwitchCase: 1 }],
        semi: [1, 'always'],
        quotes: [
            'warn',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        'space-before-function-paren': ['error', 'never'],

        // anti-patterns
        'no-var': 2,
        'no-empty-character-class': 2,
        'no-unreachable': 2,
        'no-unsafe-negation': 2,
        'no-implicit-globals': [2]
    }
};
