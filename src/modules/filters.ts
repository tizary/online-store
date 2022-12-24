import { Products, productObject } from './rednerProducts';

export class ProductsFiltering extends Products {
    productsArr!: productObject[];
    async initializeFiltering() {
        this.productsArr = await this.render();
        this.filterByCategory();
        this.filterByBrand();
        this.filterByPrice();
        this.filterByStock();
    }

    filterByCategory() {
        let categoryList = '';
        const categoryObj: Record<string, number> = {};
        this.productsArr.forEach((item: productObject) => {
            const valueItem = item.category;
            if (Object.keys(categoryObj).indexOf(item.category) === -1) {
                categoryObj[valueItem] = 1;
            } else {
                categoryObj[valueItem] = categoryObj[valueItem] + 1;
            }
        });
        Object.keys(categoryObj).forEach((item: string) => {
            categoryList += `
                <div class="list-item">
                    <input type="checkbox" id="category">
                    <label class="item-label" for="category">${item}</label>
                    <span class="item-count">(0/${categoryObj[item]})</span>
                </div>
            `;
        });

        const aside = document.querySelector('.aside__category-list');
        if (aside) {
            aside.innerHTML = categoryList;
        }
        console.log(this.productsArr);
    }

    filterByBrand() {
        let brandList = '';
        const brandObj: Record<string, number> = {};
        this.productsArr.forEach((item: productObject) => {
            const valueItem = item.brand;
            if (Object.keys(brandObj).indexOf(item.brand) === -1) {
                brandObj[valueItem] = 1;
            } else {
                brandObj[valueItem] = brandObj[valueItem] + 1;
            }
        });

        Object.keys(brandObj).forEach((item: string) => {
            brandList += `
                <div class="list-item">
                    <input type="checkbox" id="brand">
                    <label class="item-label" for="brand">${item}</label>
                    <span class="item-count">(0/${brandObj[item]})</span>
                </div>
            `;
        });
        const aside = document.querySelector('.aside__brand-list');
        if (aside) {
            aside.innerHTML = brandList;
        }
    }

    filterByPrice() {
        this.productsArr.sort((a, b) => a.price - b.price);
        const startPrice = this.productsArr[0].price;
        const endPrice = this.productsArr[this.productsArr.length - 1].price;
        const asidePrice = document.querySelector('.aside__price-block');
        if (asidePrice) {
            asidePrice.innerHTML = `
                <div class="field">
                    <span>Min: <span class="min-price">${startPrice}</span></span>
                    <span>-</span>
                    <span>Max: <span class="max-price">${endPrice}</span></span>
                </div>
                <div class="slider">
                    <div class="progress"></div>
                </div>
                <div class="range-input">
                    <input class="price-track range-min" type="range" min="${startPrice}" max="${endPrice}" value="${startPrice}">
                    <input class="price-track range-max" type="range" min="${startPrice}" max="${endPrice}" value="${endPrice}">
                </div>

            `;
        }

        const rangeInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('.price-track');
        const progress: HTMLElement | null = document.querySelector('.aside__price-block .progress');
        const minPrice: HTMLElement | null = document.querySelector('.min-price');
        const maxPrice: HTMLElement | null = document.querySelector('.max-price');
        const priceGap = 100;

        rangeInput.forEach((input) => {
            input.addEventListener('input', (e: Event) => {
                const minVal = parseInt(rangeInput[0].value);
                const maxVal = parseInt(rangeInput[1].value);
                if (progress && minPrice && maxPrice) {
                    if (maxVal - minVal < priceGap) {
                        if (e.target instanceof HTMLElement && e.target) {
                            if (e.target.classList.contains('range-min')) {
                                rangeInput[0].value = `${maxVal - priceGap}`;

                                minPrice.textContent = `${maxVal - priceGap}`;
                            } else {
                                rangeInput[1].value = `${minVal + priceGap}`;
                                maxPrice.textContent = `${minVal + priceGap}`;
                            }
                        }
                    } else {
                        progress.style.left = (minVal / endPrice) * 100 + '%';
                        progress.style.right = 100 - (maxVal / endPrice) * 100 + '%';

                        minPrice.textContent = `${minVal}`;
                        maxPrice.textContent = `${maxVal}`;
                    }
                }
            });
        });
    }

    filterByStock() {
        this.productsArr.sort((a, b) => a.stock - b.stock);

        const startAmount = this.productsArr[0].stock;
        const endAmount = this.productsArr[this.productsArr.length - 1].stock;
        const asideStock = document.querySelector('.aside__stock-block');
        if (asideStock) {
            asideStock.innerHTML = `
                <div class="field">
                    <span>Min: <span class="min-amount">${startAmount}</span></span>
                    <span>-</span>
                    <span>Max: <span class="max-amount">${endAmount}</span></span>
                </div>
                <div class="slider">
                    <div class="progress"></div>
                </div>
                <div class="range-input">
                    <input class="stock-track range-min" type="range" min="${startAmount}" max="${endAmount}" value="${startAmount}">
                    <input class="stock-track range-max" type="range" min="${startAmount}" max="${endAmount}" value="${endAmount}">
                </div>

            `;
        }

        const rangeStockInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('.stock-track');
        const progress: HTMLElement | null = document.querySelector('.aside__stock-block .progress');
        const minStock: HTMLElement | null = document.querySelector('.min-amount');
        const maxStock: HTMLElement | null = document.querySelector('.max-amount');
        const stockGap = 5;

        rangeStockInput.forEach((input) => {
            input.addEventListener('input', (e: Event) => {
                const minVal = parseInt(rangeStockInput[0].value);
                const maxVal = parseInt(rangeStockInput[1].value);
                if (progress && minStock && maxStock) {
                    if (maxVal - minVal < stockGap) {
                        if (e.target instanceof HTMLElement && e.target) {
                            if (e.target.classList.contains('range-min')) {
                                rangeStockInput[0].value = `${maxVal - stockGap}`;

                                minStock.textContent = `${maxVal - stockGap}`;
                            } else {
                                rangeStockInput[1].value = `${minVal + stockGap}`;
                                maxStock.textContent = `${minVal + stockGap}`;
                            }
                        }
                    } else {
                        progress.style.left = (minVal / endAmount) * 100 + '%';
                        progress.style.right = 100 - (maxVal / endAmount) * 100 + '%';

                        minStock.textContent = `${minVal}`;
                        maxStock.textContent = `${maxVal}`;
                    }
                }
            });
        });
    }
}

const filterBlock = new ProductsFiltering();
filterBlock.initializeFiltering();
