import { localStore } from './localStore';

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
}

export const headerBlock = new HeaderBlock();
