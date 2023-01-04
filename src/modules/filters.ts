import { Products, productObject } from './rednerProducts';
import { ProductsCard } from './card';

let filteringHashObj: Record<string, string[] | number[]>;

if (localStorage.getItem('filteringHashObj')) {
    filteringHashObj = JSON.parse(localStorage.getItem('filteringHashObj') || '');
} else {
    filteringHashObj = {};
}

export class ProductsFiltering extends Products {
    productsArr!: productObject[];
    async initializeFiltering() {
        this.productsArr = await this.render(this.url);
        if (this.productsArr) {
            this.filterByCategory();
            this.filterByBrand();
            this.filterByPrice();
            this.filterByStock();
            this.reset();
        }
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
                    <input class="checkbox" type="checkbox" id="category-${item}" name="check-category">
                    <label class="category-label item-label" for="category-${item}">${item}</label>
                    <span class="category-count item-count">(${categoryObj[item]}/${categoryObj[item]})</span>
                </div>
            `;
        });

        const aside = document.querySelector('.aside__category-list');
        if (aside) {
            aside.innerHTML = categoryList;
        }
        console.log(this.productsArr);

        let arr: string[];
        if (
            localStorage.getItem('filteringHashObj') &&
            JSON.parse(localStorage.getItem('filteringHashObj') || '').category
        ) {
            arr = JSON.parse(localStorage.getItem('filteringHashObj') || '').category;

            const categoryLabels = document.querySelectorAll('.category-label');
            categoryLabels.forEach((item) => {
                const checkedCategory = JSON.parse(localStorage.getItem('filteringHashObj') || '').category;

                checkedCategory.forEach((checkedItem: string) => {
                    if (item.textContent === checkedItem) {
                        item.closest('div')?.classList.add('checked');
                        item.closest('div')?.querySelector('.checkbox')?.setAttribute('checked', '');
                    }
                });
            });
        } else {
            arr = [];
        }

        const addProducts = new ProductsCard();
        const categoryCount = document.querySelectorAll('.category-count');
        function changeCategoryCount(value: string[]) {
            categoryCount.forEach((item) => {
                const divWrapper = item.closest('div');
                if (divWrapper) {
                    const categoryName: HTMLInputElement | null = divWrapper.querySelector('.item-label');
                    if (categoryName && categoryName.textContent) {
                        if (value.length !== 0) {
                            if (!divWrapper.classList.contains('checked')) {
                                item.textContent = `(0/${categoryObj[categoryName.textContent]})`;
                            } else {
                                item.textContent = `(${categoryObj[categoryName.textContent]}/${
                                    categoryObj[categoryName.textContent]
                                })`;
                            }
                        } else {
                            item.textContent = `(${categoryObj[categoryName.textContent]}/${
                                categoryObj[categoryName.textContent]
                            })`;
                        }
                    }
                }
            });
        }
        const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"][name="check-category"]');
        categoryCheckboxes.forEach((item) => {
            item.addEventListener('change', (e: Event) => {
                const hash: string = window.location.hash;
                if (e.target instanceof HTMLElement && e.target) {
                    const checkboxWrap: HTMLElement | null = e.target.closest('div');
                    if (checkboxWrap) {
                        const categoryName: HTMLInputElement | null = checkboxWrap.querySelector('.item-label');
                        if (!checkboxWrap.classList.contains('checked')) {
                            checkboxWrap.classList.add('checked');
                            if (categoryName && categoryName.textContent) {
                                arr.push(categoryName.textContent);
                                filteringHashObj['category'] = arr;
                                localStorage.setItem('filteringHashObj', JSON.stringify(filteringHashObj));

                                if (hash.indexOf('category') === -1) {
                                    window.location.hash += `&category=${arr.join(',')}`;
                                    addProducts.createCardList();
                                    changeCategoryCount(arr);
                                } else {
                                    window.location.hash = hash.replace(
                                        /category=(\w+|-|\w+,)+\w+/g,
                                        `category=${arr.join(',')}`
                                    );
                                    addProducts.createCardList();
                                    changeCategoryCount(arr);
                                }
                            }
                        } else {
                            checkboxWrap.classList.remove('checked');
                            arr = JSON.parse(localStorage.getItem('filteringHashObj') || '').category;
                            arr = arr.filter((item) => item !== categoryName?.textContent);
                            filteringHashObj['category'] = arr;
                            localStorage.setItem('filteringHashObj', JSON.stringify(filteringHashObj));
                            if (arr.length !== 0) {
                                window.location.hash = hash.replace(
                                    /category=(\w+|-|\w+,)+\w+/g,
                                    `category=${arr.join(',')}`
                                );
                                addProducts.createCardList();
                                changeCategoryCount(arr);
                            } else {
                                window.location.hash = hash.replace(/&category=(\w+|-|\w+,)+/g, ``);
                                addProducts.createCardList();
                                changeCategoryCount(arr);
                            }
                        }
                    }
                }
            });
        });
    }

    filterByBrand() {
        let brandList = '';
        const brandObj: Record<string, number> = {};
        this.productsArr.forEach((item: productObject) => {
            let valueItem = item.brand;
            if (valueItem.indexOf('..') !== -1) {
                valueItem = item.brand.replace('..', '');
            }
            if (valueItem.indexOf(' &') !== -1) {
                valueItem = item.brand.replace(' &', '');
            }
            if (Object.keys(brandObj).indexOf(item.brand) === -1) {
                brandObj[valueItem] = 1;
            } else {
                brandObj[valueItem] = brandObj[valueItem] + 1;
            }
        });

        Object.keys(brandObj).forEach((item: string) => {
            brandList += `
                <div class="list-item">
                    <input class="checkbox" type="checkbox" name="check-brand" id="brand-${item}">
                    <label class="brand-label item-label" for="brand-${item}">${item}</label>
                    <span class="brand-count item-count">(${brandObj[item]}/${brandObj[item]})</span>
                </div>
            `;
        });
        const aside = document.querySelector('.aside__brand-list');
        if (aside) {
            aside.innerHTML = brandList;
        }

        let arr: string[];
        if (
            localStorage.getItem('filteringHashObj') &&
            JSON.parse(localStorage.getItem('filteringHashObj') || '').brand
        ) {
            arr = JSON.parse(localStorage.getItem('filteringHashObj') || '').brand;

            const brandLabels = document.querySelectorAll('.brand-label');
            brandLabels.forEach((item) => {
                const checkedBrand = JSON.parse(localStorage.getItem('filteringHashObj') || '').brand;

                checkedBrand.forEach((checkedItem: string) => {
                    if (item.textContent === checkedItem) {
                        item.closest('div')?.classList.add('checked');
                        item.closest('div')?.querySelector('.checkbox')?.setAttribute('checked', '');
                    }
                });
            });
        } else {
            arr = [];
        }

        const addProducts = new ProductsCard();
        const brandCount = document.querySelectorAll('.brand-count');
        function changeBrandCount(value: string[]) {
            brandCount.forEach((item) => {
                const divWrapper = item.closest('div');
                if (divWrapper) {
                    const brandName: HTMLInputElement | null = divWrapper.querySelector('.item-label');
                    if (brandName && brandName.textContent) {
                        if (value.length !== 0) {
                            if (!divWrapper.classList.contains('checked')) {
                                item.textContent = `(0/${brandObj[brandName.textContent]})`;
                            } else {
                                item.textContent = `(${brandObj[brandName.textContent]}/${
                                    brandObj[brandName.textContent]
                                })`;
                            }
                        } else {
                            item.textContent = `(${brandObj[brandName.textContent]}/${
                                brandObj[brandName.textContent]
                            })`;
                        }
                    }
                }
            });
        }

        const brandCheckboxes = document.querySelectorAll('input[type="checkbox"][name="check-brand"]');
        brandCheckboxes.forEach((item) => {
            item.addEventListener('change', (e: Event) => {
                const hash: string = window.location.hash;
                if (e.target instanceof HTMLElement && e.target) {
                    const checkboxWrap: HTMLElement | null = e.target.closest('div');
                    if (checkboxWrap) {
                        const categoryName: HTMLInputElement | null = checkboxWrap.querySelector('.item-label');

                        if (!checkboxWrap.classList.contains('checked')) {
                            checkboxWrap.classList.add('checked');
                            if (categoryName && categoryName.textContent) {
                                arr.push(categoryName.textContent);
                                filteringHashObj['brand'] = arr;
                                localStorage.setItem('filteringHashObj', JSON.stringify(filteringHashObj));

                                if (hash.indexOf('brand') === -1) {
                                    window.location.hash += `&brand=${arr.join(',')}`;
                                    addProducts.createCardList();
                                    changeBrandCount(arr);
                                } else {
                                    window.location.hash = hash.replace(
                                        /brand=(\w+|-|'|\w+,|%20)+\w+/g,
                                        `brand=${arr.join(',')}`
                                    );
                                    addProducts.createCardList();
                                    changeBrandCount(arr);
                                }
                            }
                        } else {
                            checkboxWrap.classList.remove('checked');
                            checkboxWrap.classList.remove('checked');
                            arr = JSON.parse(localStorage.getItem('filteringHashObj') || '').brand;
                            arr = arr.filter((item) => item !== categoryName?.textContent);
                            filteringHashObj['brand'] = arr;
                            localStorage.setItem('filteringHashObj', JSON.stringify(filteringHashObj));
                            if (arr.length !== 0) {
                                window.location.hash = hash.replace(
                                    /brand=(\w+|-|'|\w+,|%20)+\w+/g,
                                    `brand=${arr.join(',')}`
                                );
                                addProducts.createCardList();
                                changeBrandCount(arr);
                            } else {
                                window.location.hash = hash.replace(/&brand=(\w+|-|'|\w+,|%20)+/g, ``);
                                addProducts.createCardList();
                                changeBrandCount(arr);
                            }
                        }
                    }
                }
            });
        });
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

        let arr: number[];
        if (
            localStorage.getItem('filteringHashObj') &&
            JSON.parse(localStorage.getItem('filteringHashObj') || '').price
        ) {
            arr = JSON.parse(localStorage.getItem('filteringHashObj') || '').price;
        } else {
            arr = [];
        }
        const addProducts = new ProductsCard();

        const rangeInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('.price-track');
        const progress: HTMLElement | null = document.querySelector('.aside__price-block .progress');
        const minPrice: HTMLElement | null = document.querySelector('.min-price');
        const maxPrice: HTMLElement | null = document.querySelector('.max-price');
        const priceGap = 100;

        if (arr.length !== 0 && minPrice && maxPrice && progress) {
            minPrice.textContent = `${arr[0]}`;
            maxPrice.textContent = `${arr[1]}`;
            rangeInput[0].value = `${arr[0]}`;
            rangeInput[1].value = `${arr[1]}`;
            progress.style.left = (arr[0] / endPrice) * 100 + '%';
            progress.style.right = 100 - (arr[1] / endPrice) * 100 + '%';
        }

        rangeInput.forEach((input) => {
            input.addEventListener('input', (e: Event) => {
                const hash: string = window.location.hash;
                const minVal = parseInt(rangeInput[0].value);
                const maxVal = parseInt(rangeInput[1].value);
                arr[0] = minVal;
                arr[1] = maxVal;

                if (progress && minPrice && maxPrice) {
                    if (maxVal - minVal < priceGap) {
                        if (e.target instanceof HTMLElement && e.target) {
                            if (e.target.classList.contains('range-min')) {
                                rangeInput[0].value = `${maxVal - priceGap}`;
                                minPrice.textContent = `${maxVal - priceGap}`;
                                arr[0] = maxVal - priceGap;
                            } else {
                                rangeInput[1].value = `${minVal + priceGap}`;
                                maxPrice.textContent = `${minVal + priceGap}`;
                                arr[1] = minVal + priceGap;
                            }
                        }
                    } else {
                        progress.style.left = (minVal / endPrice) * 100 + '%';
                        progress.style.right = 100 - (maxVal / endPrice) * 100 + '%';

                        minPrice.textContent = `${minVal}`;
                        maxPrice.textContent = `${maxVal}`;
                    }
                }

                if (hash.indexOf('price') === -1) {
                    window.location.hash += `&price=${arr[0]},${arr[1]}`;
                } else {
                    window.location.hash = hash.replace(/price=\w+,\w+/g, `price=${arr[0]},${arr[1]}`);
                }
                filteringHashObj['price'] = arr;
                localStorage.setItem('filteringHashObj', JSON.stringify(filteringHashObj));
            });
            input.addEventListener('mouseup', () => {
                addProducts.createCardList();
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
        let arr: number[];
        if (
            localStorage.getItem('filteringHashObj') &&
            JSON.parse(localStorage.getItem('filteringHashObj') || '').stock
        ) {
            arr = JSON.parse(localStorage.getItem('filteringHashObj') || '').stock;
        } else {
            arr = [];
        }
        const addProducts = new ProductsCard();

        const rangeStockInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('.stock-track');
        const progress: HTMLElement | null = document.querySelector('.aside__stock-block .progress');
        const minStock: HTMLElement | null = document.querySelector('.min-amount');
        const maxStock: HTMLElement | null = document.querySelector('.max-amount');
        const stockGap = 5;

        if (arr.length !== 0 && minStock && maxStock && progress) {
            minStock.textContent = `${arr[0]}`;
            maxStock.textContent = `${arr[1]}`;
            rangeStockInput[0].value = `${arr[0]}`;
            rangeStockInput[1].value = `${arr[1]}`;
            progress.style.left = (arr[0] / endAmount) * 100 + '%';
            progress.style.right = 100 - (arr[1] / endAmount) * 100 + '%';
        }

        rangeStockInput.forEach((input) => {
            input.addEventListener('input', (e: Event) => {
                const hash: string = window.location.hash;
                const minVal = parseInt(rangeStockInput[0].value);
                const maxVal = parseInt(rangeStockInput[1].value);
                arr[0] = minVal;
                arr[1] = maxVal;

                if (progress && minStock && maxStock) {
                    if (maxVal - minVal < stockGap) {
                        if (e.target instanceof HTMLElement && e.target) {
                            if (e.target.classList.contains('range-min')) {
                                rangeStockInput[0].value = `${maxVal - stockGap}`;
                                minStock.textContent = `${maxVal - stockGap}`;
                                arr[0] = maxVal - stockGap;
                            } else {
                                rangeStockInput[1].value = `${minVal + stockGap}`;
                                maxStock.textContent = `${minVal + stockGap}`;
                                arr[1] = minVal + stockGap;
                            }
                        }
                    } else {
                        progress.style.left = (minVal / endAmount) * 100 + '%';
                        progress.style.right = 100 - (maxVal / endAmount) * 100 + '%';

                        minStock.textContent = `${minVal}`;
                        maxStock.textContent = `${maxVal}`;
                    }
                }

                if (hash.indexOf('stock') === -1) {
                    window.location.hash += `&stock=${arr[0]},${arr[1]}`;
                } else {
                    window.location.hash = hash.replace(/stock=\w+,\w+/g, `stock=${arr[0]},${arr[1]}`);
                }
                filteringHashObj['stock'] = arr;
                localStorage.setItem('filteringHashObj', JSON.stringify(filteringHashObj));
            });
            input.addEventListener('mouseup', () => {
                addProducts.createCardList();
            });
        });
    }

    reset() {
        const resetBtn = document.querySelector('.reset-btn');
        const addProducts = new ProductsCard();
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                window.location.hash = '';
                localStorage.removeItem('filteringHashObj');
                addProducts.createCardList();
            });
        }
    }
}

const filterBlock = new ProductsFiltering();
filterBlock.initializeFiltering();
