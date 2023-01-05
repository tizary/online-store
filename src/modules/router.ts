import { mainPage } from './pages/mainPage';
import { cartPage } from './pages/cartPage';

const routes = [
    {
        path: '/',
        data: mainPage,
    },
    {
        path: '/cart',
        data: cartPage,
    },
];

const main = document.querySelector('.main');

function route(event: Event) {
    event.preventDefault();
    if (event.target instanceof HTMLAnchorElement) {
        history.pushState({}, '', event.target.href);
    }
    const route: Record<string, string> | undefined = routes.find((route) => route.path === window.location.pathname);
    if (main && route) {
        main.innerHTML = route.data;
    }
}

export default route;
