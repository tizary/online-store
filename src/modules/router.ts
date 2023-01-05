import { mainPage } from './pages/mainPage';

const routes = [
    {
        path: '/',
        data: mainPage,
    },
    {
        path: '/dfdf',
        data: mainPage,
    },
];

const main = document.querySelector('.main');

function route(event: Event) {
    event.preventDefault();
    if (event.target instanceof HTMLAnchorElement) {
        console.log(event.target);
        history.pushState({}, '', event.target.href);
    }
    const route: Record<string, string> | undefined = routes.find((route) => route.path === window.location.pathname);
    if (main && route) {
        main.innerHTML = route.data;
    }
}

export default route;
