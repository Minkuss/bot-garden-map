import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { packageDirectorySync } from 'pkg-dir';

const packageRoot = packageDirectorySync();

// https://vitejs.dev/config/
export default defineConfig({
    base: '/bot-garden-map/',
    plugins: [ react() ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import "src/app/styles/config/variables.scss";
                    @import "src/app/styles/config/mixins.scss";
                `,
            },
        },
    },
    resolve: {
        alias: {
          'src': path.resolve(packageRoot, './src'),
        },
    },
});
