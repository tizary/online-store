import { ProductsCard } from './productCard';

const addProducts = new ProductsCard();
// type constants = 'product-details' | 'cart';
export const getHash = (path: string): string => {
    const addr = new URL(path);
    return addr.pathname.slice(1);
};
export const render = (path: string) => {
    console.log(new URL('https://developer.mozilla.org/en-US/docs/Web/API/Location/hash').pathname);
    // console.log(window.location);
    // console.log(window.location.href);
    // console.log(window.location.hash);
    // console.log(window.location.host);
    // console.log(new URL(window.location.href).pathname);
    const app = document.querySelector('.main__block__card-field') as HTMLElement;
    let result: Promise<string> | string = '<h1>404</h1>';
    if (getHash(path) === '') {
        addProducts.createCardList().then((res) => {
            result = res;
            app.innerHTML = result;
        });
    } else {
        app.innerHTML = result;
    }
};
const initRouter = () => {
    window.addEventListener('popstate', () => {
        console.log('hi');
        render(window.location.href);
    });
    render(window.location.href);
};
initRouter();
// render(window.location.href);
