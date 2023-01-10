import { localStore } from './localStore';
import { Router } from './router';

export class HeaderBlock {
    initHeader() {
        const headerInfo = localStore.getHeaderInfo();
        const headerPrice = document.querySelector('.header__price-amount');
        const headerCount = document.querySelector('.header__cart-count');
        if (headerPrice) {
            if (headerInfo.price === undefined) {
                headerPrice.textContent = '0';
            } else {
                headerPrice.textContent = headerInfo.price;
            }
        }
        if (headerCount) {
            if (headerInfo.count === undefined) {
                headerCount.textContent = '0';
            } else {
                headerCount.textContent = headerInfo.count;
            }
        }
    }
    initLogo() {
        const headerLogo = document.querySelector('.header__logo');
        if (headerLogo) {
            const router = new Router();
            headerLogo.addEventListener('click', (event) => {
                event.preventDefault();
                localStorage.removeItem('filteringHashObj');
                if (event.target instanceof HTMLAnchorElement) {
                    const url = event.target.pathname;
                    window.history.pushState({ url }, 'url init logo', url);
                    router.initRoute(event.target.pathname);
                }
            });
        }
    }
}

export const headerBlock = new HeaderBlock();
