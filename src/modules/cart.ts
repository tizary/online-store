import { ProductsCard } from './card';
import { productObject } from './rednerProducts';

export class CartAdding extends ProductsCard {
    productsArr!: productObject[];
    addingProduct() {
        const addToCart = document.querySelectorAll('.main__block__card-field__card__footer__button');
        console.log(this.productsArr);
        console.log(addToCart);
        addToCart.forEach((item) => {
            item.addEventListener('click', () => {
                console.log(item);
            });
        });
    }
}

const cartBtn = new CartAdding();
cartBtn.addingProduct();
