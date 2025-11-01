import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tseslint from 'typescript-eslint'
import vitest from 'eslint-plugin-vitest'
import { defineConfig } from "eslint/config";
import globals from 'globals'

export default defineConfig(
    {
        ignores: [
            'dist/**',
            '**/dist/**',
            'dist-ssr/**',
            '**/dist-ssr/**',
            'coverage/**',
            '**/coverage/**',
            'node_modules/**',
            '**/node_modules/**',
            'tests/e2e/messages',
        ],
    },
    js.configs.recommended,
    ...vue.configs['flat/recommended'],
    ...tseslint.configs.recommended,
    {
        files: [
            'src/**/*.{ts,mts,tsx,vue}',
            'tests/**/*.{js,ts}'
        ],
        languageOptions: {
            parserOptions: {
                extraFileExtensions: ['.vue'],
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            'object-curly-spacing': ['error', 'always'],
            semi: ['error', 'never'],
            'no-extra-semi': 'error',
            'no-unexpected-multiline': 'error',
            'space-before-function-paren': ['error', 'always'],
            indent: [
                'error',
                2,
                {
                    ignoredNodes: ['Decorator', 'PropertyDefinition[decorators.length>0]'],
                },
            ],
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-unnecessary-type-parameters': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
        },
    },
    {
        files: [
            '**/__tests__/*.{j,t}s?(x)',
            '**/tests/**/*.spec.{j,t}s?(x)'
        ],
        ...vitest.configs.recommended,
        languageOptions: {
            globals: {
                ...vitest.environments.env.globals,
            },
        },
        rules: {
            'object-curly-spacing': ['error', 'always'],
            semi: ['error', 'never'],
            'no-extra-semi': 'error',
            'no-unexpected-multiline': 'error',
            indent: [
                'error',
                2,
                {
                    ignoredNodes: ['Decorator', 'PropertyDefinition[decorators.length>0]'],
                },
            ],
            '@typescript-eslint/no-unnecessary-type-parameters': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
        },
    },
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: ['.vue'],
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
    },
)
