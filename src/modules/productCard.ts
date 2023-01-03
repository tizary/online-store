import { Products, productObject } from './rednerProducts';

export class ProductsCard extends Products {
    productsArr!: productObject[];
    async createCardList() {
        const currentProductsArr: productObject[] = [];
        const productsArr = await this.render();
        let result = '';
        productsArr.forEach((item: productObject) => {
            result += `
            <div class="main__block__card-field__card">
                <div class="main__block__card-field__card__header" style="background: url(${item.thumbnail}) center top / 100% 100% no-repeat;"></div>
                <div class="main__block__card-field__card__footer">
                    <div class="main__block__card-field__card__footer__name">${item.title}</div>
                    <div class="main__block__card-field__card__footer__info">
                        <p>Categoty: ${item.category}</p>
                        <p>Brand: ${item.brand}</p>
                        <p>Price: ${item.price}</p>
                        <p>Discount: ${item.discountPercentage}</p>
                        <p>Rating: ${item.rating}</p>
                        <p>Stock: ${item.stock}</p>
                    </div>
                    <button class="main__block__card-field__card__footer__button">ADD TO CARD</button>
                </div>
            </div>`;
            currentProductsArr.push(item);
        });
        const foundItem = document.querySelector('.main__block__header-found') as HTMLElement;
        foundItem.textContent = `Found: ${currentProductsArr.length}`;
        return result;
    }
    consolelog() {
        console.log('currentProductsArr');
    }
}
