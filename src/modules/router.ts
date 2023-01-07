import { mainPage } from './pages/mainPage';
import { cartPage } from './pages/cartPage';
import { productDetailsPage } from './pages/productDetailsPage';

const routes = [
    {
        path: '^/$',
        data: mainPage,
    },
    {
        path: '^/cart$',
        data: cartPage,
    },
    {
        path: '^/product_details/\\d{1,5}$',
        data: productDetailsPage,
    },
];

const main = document.querySelector('.main');

function route(event: Event) {
    event.preventDefault();
    if (event.target instanceof HTMLAnchorElement) {
        history.pushState({}, '', event.target.href);
    }
    const route: Record<string, string> | undefined = routes.find((route) => {
        const regexp = new RegExp(route.path);
        return window.location.pathname.match(regexp);
    });
    if (main && route) {
        main.innerHTML = route.data;
    }
}

export default route;
