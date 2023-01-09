class LocalStore {
    keyName: string;
    keyPrice: string;
    keyCount: string;
    keyHeaderInfo: string;
    keyPromo: string;
    constructor() {
        this.keyName = 'toCart';
        this.keyPrice = 'totalPrice';
        this.keyCount = 'totalCount';
        this.keyHeaderInfo = 'headerInfo';
        this.keyPromo = 'promocod';
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

    getCount() {
        const countLocalStorage = localStorage.getItem(this.keyCount);
        if (countLocalStorage !== null) {
            return JSON.parse(countLocalStorage);
        }
        return {};
    }

    putCountFirst(id: string) {
        const countInCart = this.getCount();
        if (countInCart[id] === undefined) {
            countInCart[id] = 1;
        } else {
            delete countInCart[id];
        }

        localStorage.setItem(this.keyCount, JSON.stringify(countInCart));

        return { countInCart };
    }

    putCount(id: string, count: number) {
        const countInCart = this.getCount();
        countInCart[id] = count;
        localStorage.setItem(this.keyCount, JSON.stringify(countInCart));
        return { countInCart };
    }

    getHeaderInfo() {
        const headerInfo = localStorage.getItem(this.keyHeaderInfo);
        if (headerInfo !== null) {
            return JSON.parse(headerInfo);
        }
        return {};
    }

    putHeaderInfo(price: number, count: number) {
        const headerInfo = this.getHeaderInfo();
        headerInfo.price = price;
        headerInfo.count = count;

        localStorage.setItem(this.keyHeaderInfo, JSON.stringify(headerInfo));
        return { headerInfo };
    }

    getPromo() {
        const promo = localStorage.getItem(this.keyPromo);
        if (promo !== null) {
            return JSON.parse(promo);
        }
        return [];
    }

    putPromo(promocod: string) {
        const promo = this.getPromo();
        const index = promo.indexOf(promocod);
        if (index === -1) {
            promo.push(promocod);
            localStorage.setItem(this.keyPromo, JSON.stringify(promo));
        } else {
            promo.splice(index, 1);
        }
    }
}

export const localStore = new LocalStore();
