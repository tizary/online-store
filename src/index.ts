import './index.scss';
import './modules/rednerProducts';
import './modules/filters';
import './modules/card';
import './modules/cart';
import './modules/localStore';
import { Router } from './modules/router';
import { HeaderBlock } from './modules/headerBlock';
import { InitializeCart } from './modules/cart';

const headerInit = new HeaderBlock();
const cartInit = new InitializeCart();
cartInit.openCart();
headerInit.initHeader();
headerInit.initLogo();
const router = new Router();
router.initRoute(window.location.pathname);
window.addEventListener('popstate', (e) => {
    console.log('aasd');
    console.log(e.state);
    if (e.state !== null) {
        console.log('1000');
        router.initRoute(window.location.href);
    }
});
