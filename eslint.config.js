import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import { configs as importConfigs } from 'eslint-plugin-import';


/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
                ...globals.jest,
            },
        },
        // Specify the plugins
        plugins: {
            import: importPlugin,
        },
        rules: {
            ...importConfigs.recommended.rules,
            'import/no-extraneous-dependencies': ['error', {
                devDependencies: ['**/test/**', '**/tests/**', '**/*.test.js', '**/*.spec.js'],
                optionalDependencies: false,
                peerDependencies: false,
            }],
            'spaced-comment': ['error', 'always'],
            indent: ['error', 2, {
                SwitchCase: 1,
                MemberExpression: 1,
            }],
            quotes: ['error', 'single', {allowTemplateLiterals: true}],
            semi: ['error', 'always'],
            'max-len': ['error', 180],
            'no-restricted-imports': ["error", {
                patterns: [
                    {group: ["src/*"], message: "Please use relative path only."},
                    {group: ["dist/*", "*/dist/*", "*/dist"], message: "Please do not use 'dist' location."},
                ]
            }],
            'object-curly-spacing': ['warn', 'always', {
                'arraysInObjects': false,
                'objectsInObjects': false,
            }],
            'array-bracket-spacing': ['warn', 'always', {
                'singleValue': false,
                'arraysInArrays': false,
                'objectsInArrays': false,
            }],
        },
        ignores: [
            "domain/**/*.spec.js",  // Ignore all spec files within the domain folder
            "eslint.config.js*",    // Ignore eslint.config.js and any files with additional characters after .js
        ],
    }
];