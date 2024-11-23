import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0', // يجعل Vite متاحًا عبر الشبكة
        port: 3000, // اختر رقم المنفذ
        strictPort: true,
        hmr: {
            host: '192.168.1.42', // عنوان IP الخاص بجهاز الكمبيوتر
        },
      },
});
