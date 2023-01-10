import { Products, productObject } from './rednerProducts';
import { Router } from './router';
import { localStore } from './localStore';
import { ProductsCard } from './card';

export class DetailsPage extends Products {
    productsArr!: productObject[];
    async renderDetailsPage() {
        this.productsArr = await this.render(this.url);
        this.getProductId();
        const item = this.productsArr.find((el) => el.id === +this.getProductId());
        const mainBlock = document.querySelector('.details__container');
        const productsStore = localStore.getProducts();
        let activeClass = '';
        let activeText = '';
        if (productsStore.indexOf(`${item?.id}`) === -1) {
            activeText = 'ADD TO CART';
        } else {
            activeClass = ' cart-active';
            activeText = 'DROP FROM CART';
        }
        if (mainBlock && item) {
            mainBlock.innerHTML = `
            <div class="details__container__link">
                <a class="store-link" href="/">Store</a>
                <p>»</p>
                <a>${item.category}</a>
                <p>»</p>
                <a>${item.brand}</a>
                <p>»</p>
                <a>${item.title}</a>
            </div>
            <div class="details__container__img">
                <div class="details__container__img__small"></div>
                <div class="details__container__img__big">
                  <img class="details__container__img__big__item" src="${item.thumbnail}" loading="lazy" alt="${item.category}">
                </div>
            </div>
            <div class="details__container__info">
                <div class="details__container__info__name">${item.title}</div>
                <div class="details__container__info__description">
                    <div class="details__container__info__description__header">
                        <p>Categoty:</p>
                        <p>Brand:</p>
                        <p>Discount:</p>
                        <p>Rating:</p>
                        <p>Stock:</p>
                    </div>
                    <div class="details__container__info__description__value">
                        <p>${item.category}</p>
                        <p>${item.brand}</p>
                        <p>${item.discountPercentage}</p>
                        <p>${item.rating}</p>
                        <p>${item.stock}</p>
                    </div>
                </div>
                <div class="details__container__info__price">${item.price}€</div>
                <div class="details__container__info__button">
                    <button class="details__container__info__button__add${activeClass}" data-btnid="${item.id}" data-btnprice="${item.price}">${activeText}</button>
                    <a href="/cart"><button class="details__container__info__button__buy">BUY NOW</button></a>
                </div>
            </div>
            `;
            const productCard = new ProductsCard();
            const storeButton = document.querySelector('.store-link');
            if (storeButton) {
                storeButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    const router = new Router();
                    if (event.target instanceof HTMLAnchorElement) {
                        console.log('dfdf');
                        const url = event.target.pathname;
                        window.history.pushState({ url }, 'url open card', url);
                        router.initRoute(event.target.pathname);
                    }
                });
            }
            const addButton = document.querySelector('.details__container__info__button__add');
            addButton?.addEventListener('click', productCard.changeClick, false);
            const smallView = document.querySelector('.details__container__img__small');
            const arr = item.images;
            const imgWeight: string[] = [];
            arr.forEach((element) => {
                const weight = this.getWeightImg(element);
                if (!imgWeight.includes(weight)) {
                    imgWeight.push(weight);
                    const smallImg = document.createElement('img');
                    smallImg.loading = 'lazy';
                    smallImg.alt = `${item.category}`;
                    if (smallView) {
                        smallView.insertBefore(smallImg, null).classList.add('details__container__img__small__item');
                        smallImg.src = `${element}`;
                    }
                    smallImg.addEventListener('click', (e) => {
                        this.changePic(e);
                    });
                }
            });
        }
    }
    getProductId(): string {
        return window.location.pathname.split('/').slice(-1)[0];
    }
    changePic(event: MouseEvent) {
        const target = event.target;
        const bigView = document.querySelector('.details__container__img__big__item') as HTMLImageElement;
        if (bigView) {
            if (target instanceof HTMLImageElement) {
                bigView.src = target.src;
            }
        }
    }
    getWeightImg(url: string) {
        const req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        return req.getResponseHeader('content-length') || '';
    }
}
