class LocalStore {
    keyName: string;
    keyPrice: string;
    constructor() {
        this.keyName = 'toCart';
        this.keyPrice = 'totalPrice';
    }

    getProducts() {
        const productsLocalStorage = localStorage.getItem(this.keyName);
        if (productsLocalStorage !== null) {
            return JSON.parse(productsLocalStorage);
        }
        return [];
    }

    putProducts(id: string) {
        const productsInCart = this.getProducts();
        let pushProduct = false;
        const index = productsInCart.indexOf(id);

        if (index === -1) {
            productsInCart.push(id);
            pushProduct = true;
        } else {
            productsInCart.splice(index, 1);
        }

        localStorage.setItem(this.keyName, JSON.stringify(productsInCart));

        return { pushProduct, productsInCart };
    }

    getPrice() {
        const priceLocalStorage = localStorage.getItem(this.keyPrice);
        if (priceLocalStorage !== null) {
            return JSON.parse(priceLocalStorage);
        }
        return [];
    }

    putPrice(price: string) {
        const priceInCart = this.getPrice();
        const index = priceInCart.indexOf(price);

        if (index === -1) {
            priceInCart.push(price);
        } else {
            priceInCart.splice(index, 1);
        }

        localStorage.setItem(this.keyPrice, JSON.stringify(priceInCart));

        return { priceInCart };
    }
}

export const localStore = new LocalStore();
