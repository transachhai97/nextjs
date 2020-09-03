import Router from 'next/router';
import NProgress from 'nprogress';

import Toastify from '@/components/Toastify';

import '@/styles/index.scss';

Router.events.on('routeChangeStart', (url) => {
    NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
    return <>
        <Toastify />
        <Component {...pageProps} />
    </>;
}

export default MyApp;
