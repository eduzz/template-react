const { ignores, configs } = require('@eduzz/eslint-config/react'); // React

/** @type import('eslint').Linter.Config[] */
module.exports = [...configs, { ignores: ignores() }];
