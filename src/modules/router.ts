import { mainPage } from './pages/mainPage';
import { cartPage } from './pages/cartPage';
import { errorPage } from './pages/404';
import { productDetailsPage } from './pages/productDetailsPage';
import { ProductsCard } from './card';
import { ProductsFiltering } from './filters';
import { InitializeCart } from './cart';
import { DetailsPage } from './productDetails';

export class Router {
    initRoute(url: string) {
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
        window.history.pushState({ url }, 'url', url);
        const route: Record<string, string> | undefined = routes.find((route) => {
            const regexp = new RegExp(route.path);
            return window.location.pathname.match(regexp);
        });
        if (main && route) {
            main.innerHTML = route.data;
            const pathname = window.location.pathname;
            if (pathname.match(new RegExp('^/$'))) {
                const cards = new ProductsCard();
                const filters = new ProductsFiltering();
                cards.mainBlockActionsInit();
                filters.initializeFiltering();
            } else if (pathname.match(new RegExp('^/cart$'))) {
                const cart = new InitializeCart();
                cart.renderCart();
            } else if (pathname.match(new RegExp('^/product_details/\\d{1,5}$'))) {
                const detailsPage = new DetailsPage();
                detailsPage.renderDetailsPage();
            }
        } else {
            if (main) {
                main.innerHTML = errorPage;
            }
        }
    }
}
export const router = new Router();
