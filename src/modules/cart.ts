import { Router } from './router';
import { localStore } from './localStore';
import { productObject, Products } from './rednerProducts';
import { headerBlock } from './headerBlock';

export class InitializeCart extends Products {
    productsArr!: productObject[];

    openCart() {
        const cardLogo = document.querySelector('.header__cart-logo');

        if (cardLogo) {
            cardLogo.addEventListener('click', (e) => {
                const router = new Router();
                router.initRoute(e);
                this.renderList();
                this.changeCountProduct();
            });
        }
    }

    async renderList() {
        this.productsArr = await this.render(this.url);
        const productsStore = localStore.getProducts();
        let htmlCartProduct = '';
        let totalPrice = 0;
        let totalCount = 0;
        let index = 1;
        const curObj = localStore.getCount();
        this.productsArr.forEach((item) => {
            if (productsStore.indexOf(`${item.id}`) !== -1) {
                htmlCartProduct += `
                    <div class="cart__block-list">
                        <span class="item-number">${index}</span>
                        <div class="img-container">
                            <img class="item-img" src=${item.thumbnail} loading="lazy"></img>
                        </div>
                        <div class="item-desc">
                            <p class="item-title">${item.title}</p>
                            <p>Description: <span class="item-text">${item.description}</span></p>
                            <p>Discount: <span class="item-text">${item.discountPercentage}</span></p>
                            <p>Rating: <span class="item-text">${item.rating}</span></p>
                        </div>
                        <div class="item-price-info">
                            <p class="item-price">${item.price * curObj[item.id]}</p>
                            <div class="item-count">
                                <button class="btn-minus" data-removeid="${item.id}" data-removeprice="${
                    item.price
                }">-</button>
                                <span class="product-amount">${curObj[item.id]}</span>
                                <button class="btn-plus" data-removeid="${item.id}" data-removeprice="${
                    item.price
                }">+</button>
                            </div>
                            <p>Stock: <span class="item-text">${item.stock}</span></p>
                        </div>
                    </div>
                    <div class="item-line"></div>
                `;
                index++;
                totalPrice += item.price * curObj[item.id];
                totalCount += curObj[item.id];
            }
        });

        const cartBlock = document.querySelector('.cart__block-prod');
        if (cartBlock) {
            cartBlock.innerHTML = htmlCartProduct;
        }

        const htmlCartSummary = `
            <p>Products: <span class="cart-count">${totalCount}</span></p>
            <p>Total: <span class="cart-total-price">${totalPrice}</span></p>
            <button class="btn buy-btn">BUY NOW</button>
        `;

        const cartSummary = document.querySelector('.cart__summary-description');
        if (cartSummary) {
            cartSummary.innerHTML = htmlCartSummary;
        }
    }

    changeCountProduct() {
        const cartBlock = document.querySelector('.cart__block-prod');
        if (cartBlock) {
            cartBlock.addEventListener('click', (e) => {
                if (e.target && e.target instanceof HTMLElement) {
                    if (e.target.classList.contains('btn-minus')) {
                        const countInput = e.target.nextElementSibling;
                        const closestDiv = e.target.closest('div.item-price-info');
                        const itemPrice = closestDiv?.querySelector('.item-price');
                        const productRemovePrice = e.target.dataset.removeprice;
                        const productRemoveId = e.target.dataset.removeid;
                        const totalPrice = document.querySelector('.cart-total-price');
                        const totalCount = document.querySelector('.cart-count');

                        if (countInput && countInput.textContent && productRemovePrice && productRemoveId) {
                            const count = parseInt(countInput.textContent);
                            if (count > 0) {
                                countInput.textContent = `${count - 1}`;
                                localStore.putCount(productRemoveId, count - 1);
                                if (itemPrice && itemPrice.textContent) {
                                    const curObj = localStore.getCount();
                                    itemPrice.textContent = `${parseInt(productRemovePrice) * curObj[productRemoveId]}`;
                                }
                                if (totalPrice && totalPrice.textContent && totalCount && totalCount.textContent) {
                                    const curTotalPrice = totalPrice.textContent;
                                    totalPrice.textContent = `${
                                        parseInt(curTotalPrice) - parseInt(productRemovePrice)
                                    }`;
                                    const curTotalCount = totalCount.textContent;
                                    totalCount.textContent = `${parseInt(curTotalCount) - 1}`;
                                    localStore.putHeaderInfo(
                                        parseInt(curTotalPrice) - parseInt(productRemovePrice),
                                        parseInt(curTotalCount) - 1
                                    );
                                }
                                headerBlock.initHeader();
                            }
                            if (count === 1) {
                                const productRemoveId = e.target.dataset.removeid;
                                const productRemovePrice = e.target.dataset.removeprice;
                                if (productRemoveId && productRemovePrice) {
                                    localStore.putProducts(productRemoveId);
                                    localStore.putPrice(productRemovePrice);
                                    localStore.putCountFirst(productRemoveId);
                                    this.renderList();
                                }
                            }
                        }
                    } else if (e.target.classList.contains('btn-plus')) {
                        const countInput = e.target.previousElementSibling;
                        const closestDiv = e.target.closest('div.item-price-info');
                        const stockCount = closestDiv?.querySelector('.item-text');
                        const itemPrice = closestDiv?.querySelector('.item-price');
                        const productRemovePrice = e.target.dataset.removeprice;
                        const productRemoveId = e.target.dataset.removeid;
                        const totalPrice = document.querySelector('.cart-total-price');
                        const totalCount = document.querySelector('.cart-count');
                        if (
                            countInput &&
                            countInput.textContent &&
                            stockCount &&
                            stockCount.textContent &&
                            productRemoveId &&
                            productRemovePrice
                        ) {
                            const count = parseInt(countInput.textContent);
                            if (count < parseInt(stockCount.textContent)) {
                                countInput.textContent = `${count + 1}`;
                                localStore.putCount(productRemoveId, count + 1);
                                if (itemPrice && itemPrice.textContent) {
                                    const curObj = localStore.getCount();
                                    itemPrice.textContent = `${parseInt(productRemovePrice) * curObj[productRemoveId]}`;
                                }
                                if (totalPrice && totalPrice.textContent && totalCount && totalCount.textContent) {
                                    const curTotalPrice = totalPrice.textContent;
                                    totalPrice.textContent = `${
                                        parseInt(curTotalPrice) + parseInt(productRemovePrice)
                                    }`;
                                    const curTotalCount = totalCount.textContent;
                                    totalCount.textContent = `${parseInt(curTotalCount) + 1}`;
                                    localStore.putHeaderInfo(
                                        parseInt(curTotalPrice) + parseInt(productRemovePrice),
                                        parseInt(curTotalCount) + 1
                                    );
                                }
                                headerBlock.initHeader();
                            }
                        }
                    }
                }
            });
        }
    }
}

const initializeCard = new InitializeCart();
initializeCard.openCart();
