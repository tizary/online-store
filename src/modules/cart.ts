import route from './router';

export class InitializeCart {
    cardLogo = document.querySelector('.header__cart-logo');

    init() {
        if (this.cardLogo) {
            this.cardLogo.addEventListener('click', (e) => {
                route(e);
            });
        }
    }
}

const initializeCard = new InitializeCart();
initializeCard.init();
