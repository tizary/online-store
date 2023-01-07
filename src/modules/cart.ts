import { Router } from './router';
import { localStore } from './localStore';
import { productObject, Products } from './rednerProducts';

export class InitializeCart extends Products {
    productsArr!: productObject[];

    openCart() {
        const cardLogo = document.querySelector('.header__cart-logo');

        if (cardLogo) {
            cardLogo.addEventListener('click', (e) => {
                const router = new Router();
                router.initRoute(e);
                this.renderList();
            });
        }
    }

    async renderList() {
        this.productsArr = await this.render(this.url);
        const productsStore = localStore.getProducts();
        let htmlCartProduct = '';
        let totalPrice = 0;
        let index = 1;
        this.productsArr.forEach((item) => {
            if (productsStore.indexOf(`${item.id}`) !== -1) {
                htmlCartProduct += `
                    <div class="cart__block-list">
                        <span class="item-number">${index}</span>
                        <div class="img-container">
                            <img class="item-img" src=${item.thumbnail}></img>
                        </div>
                        <div class="item-desc">
                            <p class="item-title">${item.title}</p>
                            <p>Description: <span class="item-text">${item.description}</span></p>
                            <p>Discount: <span class="item-text">${item.discountPercentage}</span></p>
                            <p>Rating: <span class="item-text">${item.rating}</span></p>
                        </div>
                        <div class="item-price-info">
                            <p class="item-price">${item.price}</p>
                            <div class="item-count">
                                <button class="btn-minus">-</button>
                                <span>1</span>
                                <button class="btn-plus">+</button>
                            </div>
                            <p>Stock: <span class="item-text">${item.stock}</span></p>
                        </div>
                    </div>
                    <div class="item-line"></div>
                `;
                index++;
                totalPrice += item.price;
            }
        });

        const cartBlock = document.querySelector('.cart__block-prod');
        if (cartBlock) {
            cartBlock.innerHTML = htmlCartProduct;
        }

        const htmlCartSummary = `
            <p>Products: <span class="cart-count">${index - 1}</span></p>
            <p>Total: <span class="cart-total-price">${totalPrice}</span></p>
            <button class="btn buy-btn">BUY NOW</button>
        `;

        const cartSummary = document.querySelector('.cart__summary-description');
        if (cartSummary) {
            cartSummary.innerHTML = htmlCartSummary;
        }
    }
}

const initializeCard = new InitializeCart();
initializeCard.openCart();
