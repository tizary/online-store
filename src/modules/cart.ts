// import route from './router';
import { Router } from './router';

export class InitializeCart {
    cardLogo = document.querySelector('.header__cart-logo');

    init() {
        if (this.cardLogo) {
            this.cardLogo.addEventListener('click', (e) => {
                // route(e);
                const router = new Router();
                router.initRoute(e);
            });
        }
    }
}

const initializeCard = new InitializeCart();
initializeCard.init();
