import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import DefaultLayout from './Layouts/DefaultLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Ghaith';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ).then((module) => {
            // إذا لم يكن هناك تخطيط محدد للصفحة، يتم استخدام التخطيط الافتراضي
            const Page = module.default;
            if (!Page.layout) {
                Page.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;
            }
            return module;
        }),

    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
