import { Router } from './router';
import { localStore } from './localStore';
import { productObject, Products } from './rednerProducts';
import { headerBlock } from './headerBlock';
import { ProductsCard } from './card';

interface promoObject {
    name: string;
    percent: number;
    status: boolean;
}

export class InitializeCart extends Products {
    productsArr!: productObject[];

    openCart() {
        const cardLogo = document.querySelector('.header__cart-logo');

        if (cardLogo) {
            cardLogo.addEventListener('click', (event) => {
                event.preventDefault();
                const router = new Router();
                if (event.target instanceof HTMLAnchorElement) {
                    router.initRoute(event.target.pathname);
                }
                this.renderList();
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
                                <a class = "item-anchor" data-id="${item.id}" href="/product_details/${item.id}"></a>
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

        const promocod: Record<string, promoObject> = {
            rs: {
                name: 'Rolling Scopes School',
                percent: 10,
                status: true,
            },
            epm: {
                name: 'EPAM Systems',
                percent: 10,
                status: true,
            },
        };

        const promocodArr = Object.keys(promocod);
        const promocodList = promocodArr.join(', ');

        const promoList = localStore.getPromo();
        let promoPercent = 0;
        if (promoList.length) {
            promoList.forEach((item: string) => {
                const promoObj: number = promocod[item].percent;
                promoPercent = promoPercent + promoObj;
                console.log(promoPercent);
            });
        }

        const htmlCartSummary = `
            <p>Products: <span class="cart-count">${totalCount}</span></p>
            <p>Total: <span class="cart-total-price">${totalPrice}</span></p>
            <div class="promocod-container hidden">
                <p class="cart-promo-price">Total: <span class="cart-total-price">${
                    (totalPrice * (100 - promoPercent)) / 100
                }</span></p>
            </div>

            <input class="cart-promo" type="search" placeholder="Enter promo code">
            <div class="promo-offer hidden">
                <span class="promo-offer-active"></span>
                <button class="btn promo-btn promo-offer-add">ADD</button>
            </div>
            <p class="promocod">Promo for test: ${promocodList.toUpperCase()}</p>
            <button class="btn buy-btn">BUY NOW</button>
        `;

        const cartSummary = document.querySelector('.cart__summary-description');
        if (cartSummary) {
            cartSummary.innerHTML = htmlCartSummary;
        }
        const cardDetails = document.querySelector('.cart__block');
        cardDetails?.addEventListener('click', (event) => {
            const card = new ProductsCard();
            card.cardEvents(event);
        });

        const cartPromo = document.querySelector('.cart-promo');
        cartPromo?.addEventListener('input', (e) => {
            this.changePromo(e, promocod);
        });

        const promoAddBtn = document.querySelector('.cart-promo');
        promoAddBtn?.addEventListener('click', (e) => {
            this.addingPromo(e, promocod);
        });
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

    changePromo(e: Event, promocod: Record<string, promoObject>) {
        const promocodArr = Object.keys(promocod);

        const promoOffer = document.querySelector('.promo-offer');
        const promoAddBtn = document.querySelector('.promo-offer-add');
        const promoOfferActive = document.querySelector('.promo-offer-active') as HTMLElement;

        if (e.target instanceof HTMLInputElement) {
            const promo = e.target.value;
            if (
                promo &&
                (promocodArr.indexOf(promo) !== -1 || promocodArr.join(',').toUpperCase().indexOf(promo) !== -1)
            ) {
                promoOffer?.classList.remove('hidden');
                const promocodItem = promocod[promo.toLocaleLowerCase()];
                if (promocodItem.status) {
                    promoAddBtn?.classList.remove('hidden');
                }
                promoOfferActive.textContent = `${promocodItem.name} - ${promocodItem.percent}%`;
            } else {
                promoOffer?.classList.add('hidden');
            }
        }
    }

    addingPromo(e: Event, promocod: Record<string, promoObject>) {
        const cartPromo = document.querySelector('.cart-promo') as HTMLInputElement;
        const promoPrice = document.querySelector('.cart-promo-price');
        const totalPrice = document.querySelector('.cart-total-price');
        const activePromocod = document.querySelector('.promocod-container');
        const promo = cartPromo.value.toLowerCase();
        console.log(promo);
        if (promocod[promo] !== undefined) {
            promocod[promo].status = false;
            localStore.putPromo(promo);
        }
        if (e.target instanceof HTMLElement) {
            promoPrice?.classList.remove('hidden');
            totalPrice?.classList.add('cross-price');
            e.target.classList.add('hidden');
            activePromocod?.classList.remove('hidden');
            const div = document.createElement('div');
            div.classList.add('active-promocod');
            const promoText = document.createElement('p');
            promoText.classList.add('promo-text');
            promoText.textContent = `${promocod[promo].name}: -${promocod[promo].percent}%`;
            const dropBtn = document.createElement('button');
            dropBtn.classList.add('btn', 'promo-btn', 'promo-offer-drop');
            dropBtn.textContent = 'DROP';
            div.append(promoText, dropBtn);
            activePromocod?.append(div);
        }
    }

    droppingPromo() {
        const promoAddBtn = document.querySelector('.promo-offer-add');
        promoAddBtn?.addEventListener('click', (e) => {
            if (e.target instanceof HTMLElement) {
                if (e.target.classList.contains('promo-offer-drop')) {
                    e.target.closest('div')?.remove();
                }
            }
        });
    }
    renderCart() {
        this.renderList();
        this.changeCountProduct();
    }
}
