module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier'
  ],
  "overrides": [
        {
            "files": [
                "*.ts"
            ],
            "plugins": [
                "import",
                "@typescript-eslint",
                "sonarjs"
            ],
            "extends": [
                "eslint:recommended",
                "plugin:import/errors",
                "plugin:import/warnings",
                "plugin:sonarjs/recommended",
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking"
            ],
            "rules": {
                "max-len": [
                    "error",
                    {
                        "code": 140
                    }
                ],
                "no-console": "error",
                "no-else-return": "error",
                "no-lonely-if": "error",
                "no-return-await": "error",
                "no-unused-expressions": "error",
                "no-useless-return": "error",
                "no-restricted-imports": [
                    "error",
                    {
                        "patterns": [
                            "rxjs/*",
                            "!rxjs/operators"
                        ]
                    }
                ],
                "prefer-destructuring": "error",
                "semi": "error",
                "import/no-unresolved": "off",
                "import/no-relative-parent-imports": "error",
                "sonarjs/prefer-immediate-return": "off",
                "sonarjs/cognitive-complexity": "off",
                "sonarjs/no-duplicate-string": "off",
                "@typescript-eslint/no-floating-promises": "error",
                "@typescript-eslint/no-unsafe-return": "error",
                "@typescript-eslint/promise-function-async": "error",
                "@typescript-eslint/require-await": "off",
                "@typescript-eslint/no-misused-promises": [
                    "error",
                    {
                        "checksVoidReturn": false
                    }
                ],
                "@typescript-eslint/explicit-function-return-type": [
                    "warn",
                    {
                        "allowExpressions": true
                    }
                ],
                "@typescript-eslint/no-unsafe-assignment": "error",
                "@typescript-eslint/no-unsafe-call": "error"
            }
        }
    ]
}
