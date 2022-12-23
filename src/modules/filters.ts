import { Products, productObject } from './rednerProducts';

export class ProductsFiltering extends Products {
    productsArr!: productObject[];
    async initializeFiltering() {
        this.productsArr = await this.render();
        this.filterByCategory();
        this.filterByBrand();
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
        // console.log(this.productsArr);
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
}

const filterBlock = new ProductsFiltering();
filterBlock.initializeFiltering();
