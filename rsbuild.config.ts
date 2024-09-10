import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  output: { cleanDistPath: true },
  html: {
    title: 'Eduzz'
  }
});
