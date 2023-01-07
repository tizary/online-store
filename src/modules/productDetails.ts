import { Products, productObject } from './rednerProducts';
// import route from './router';

export class DetailsPage extends Products {
    productsArr!: productObject[];
    async renderDetailsPage() {
        this.productsArr = await this.render(this.url);
        this.getProductId();
        const item = this.productsArr.find((el) => el.id === +this.getProductId());
        const mainBlock = document.querySelector('.details__container');
        if (mainBlock && item) {
            mainBlock.innerHTML = `
            <div class="details__container__img">
                <div class="details__container__img__small"></div>
                <div class="details__container__img__big">
                  <img class="details__container__img__big__item" src="${item.thumbnail}" loading="lazy" alt="${item.category}">
                </div>
            </div>
            <div class="details__container__info">
                <div class="details__container__info__name">${item.title}</div>
                <div class="details__container__info__description">
                    <p>Categoty: ${item.category}</p>
                    <p>Brand: ${item.brand}</p>
                    <p>Price: ${item.price}</p>
                    <p>Discount: ${item.discountPercentage}</p>
                    <p>Rating: ${item.rating}</p>
                    <p>Stock: ${item.stock}</p>
                </div>
                <div class="details__container__info__price">${item.price}</div>
                <div class="details__container__info__button">
                    <button class="details__container__info__button__add">ADD TO CARD</button>
                    <button class="details__container__info__button__buy">BUY NOW</button>
                </div>
            </div>
            `;
            const smallView = document.querySelector('.details__container__img__small');
            const arr = item.images;
            arr.forEach((element) => {
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
}
