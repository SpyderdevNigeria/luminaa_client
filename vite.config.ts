import { defineConfig } from 'vite';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    tailwindcss(),
    
  ],
});