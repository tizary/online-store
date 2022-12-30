import { Products, productObject } from './rednerProducts';

export class ProductsCard extends Products {
    productsArr!: productObject[];
    async createCardList() {
        const hash: string = window.location.hash;
        console.log(hash);

        let productsArr: productObject[] = [];
        if (!hash) {
            productsArr = await this.render(this.url);
        } else {
            if (hash.indexOf('category') !== 0) {
                let allArr;
                const categoryArr: productObject[] = [];
                if (productsArr.length !== 0) {
                    allArr = productsArr;
                } else {
                    allArr = await this.render(this.url);
                }
                const arr: string[] = JSON.parse(localStorage.getItem('filteringHashObj') || '').category || [];

                allArr.forEach((item: productObject) => {
                    arr.forEach((categoryFilter) => {
                        if (item.category === categoryFilter) {
                            categoryArr.push(item);
                        }
                    });
                });
                productsArr = categoryArr;
            }
            if (hash.indexOf('brand') !== -1) {
                let allArr;
                const brandArr: productObject[] = [];
                if (productsArr.length !== 0) {
                    allArr = productsArr;
                } else {
                    allArr = await this.render(this.url);
                }
                const arr: string[] = JSON.parse(localStorage.getItem('filteringHashObj') || '').brand || [];
                allArr.forEach((item: productObject) => {
                    arr.forEach((brandFilter) => {
                        if (item.brand === brandFilter) {
                            brandArr.push(item);
                        }
                    });
                });
                productsArr = brandArr;
            }
            if (hash.indexOf('price') !== -1) {
                let allArr;
                const priceArr: productObject[] = [];
                if (productsArr.length !== 0) {
                    allArr = productsArr;
                } else {
                    allArr = await this.render(this.url);
                }
                const arr: number[] = JSON.parse(localStorage.getItem('filteringHashObj') || '').price || [];
                allArr.forEach((item: productObject) => {
                    if (item.price >= arr[0] && item.price <= arr[1]) {
                        priceArr.push(item);
                    }
                });
                productsArr = priceArr;
            }
            if (hash.indexOf('stock') !== -1) {
                let allArr;
                const stockArr: productObject[] = [];
                if (productsArr.length !== 0) {
                    allArr = productsArr;
                } else {
                    allArr = await this.render(this.url);
                }
                const arr: number[] = JSON.parse(localStorage.getItem('filteringHashObj') || '').stock || [];
                allArr.forEach((item: productObject) => {
                    if (item.stock >= arr[0] && item.stock <= arr[1]) {
                        stockArr.push(item);
                    }
                });
                productsArr = stockArr;
            }
        }
        console.log(productsArr);

        let cardList = '';
        productsArr.forEach((item: productObject) => {
            cardList += `
            <div class="card">
                <p>${item.title}</p>
            </div>
        `;
        });

        const mainBlock = document.querySelector('.main__block');
        if (mainBlock) {
            mainBlock.innerHTML = cardList;
        }
    }
}

const addProducts = new ProductsCard();
addProducts.createCardList();
