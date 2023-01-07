import { Products, productObject } from './rednerProducts';
import route from './router';
import { DetailsPage } from './productDetails';
export class ProductsCard extends Products {
    productsArr!: productObject[];
    async createCardList() {
        const hash: string = window.location.hash;
        let productsArr: productObject[] = [];
        if (
            hash.indexOf('brand') === -1 &&
            hash.indexOf('category') === -1 &&
            hash.indexOf('price') === -1 &&
            hash.indexOf('stock') === -1
        ) {
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
                const arr: string[] = this.findParametrs('category');
                allArr.forEach((item: productObject) => {
                    if (arr.includes(item.category)) {
                        categoryArr.push(item);
                    }
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
                const arr: string[] = this.findParametrs('brand');
                allArr.forEach((item: productObject) => {
                    if (arr.includes(item.brand)) {
                        brandArr.push(item);
                    }
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
                const arr: string[] = this.findParametrs('price');
                allArr.forEach((item: productObject) => {
                    if (item.price >= +arr[0] && item.price <= +arr[1]) {
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
                const arr: string[] = this.findParametrs('stock');
                allArr.forEach((item: productObject) => {
                    if (item.stock >= +arr[0] && item.stock <= +arr[1]) {
                        stockArr.push(item);
                    }
                });
                productsArr = stockArr;
            }
        }
        if (hash.indexOf('sort') !== -1) {
            if (productsArr.length === 0) {
                productsArr = await this.render(this.url);
            }
            const select = document.getElementById('select') as HTMLSelectElement;
            switch (+select.value) {
                case 1:
                    productsArr.sort((a, b) => a.price - b.price);
                    window.location.hash = hash.replace(/(sort=true)\d{0,}/, `sort=true${select.value}`);
                    break;
                case 2:
                    productsArr.sort((a, b) => b.price - a.price);
                    window.location.hash = hash.replace(/(sort=true)\d{0,}/, `sort=true${select.value}`);
                    break;
                case 3:
                    productsArr.sort((a, b) => a.rating - b.rating);
                    window.location.hash = hash.replace(/(sort=true)\d{0,}/, `sort=true${select.value}`);
                    break;
                case 4:
                    productsArr.sort((a, b) => b.rating - a.rating);
                    window.location.hash = hash.replace(/(sort=true)\d{0,}/, `sort=true${select.value}`);
                    break;
                case 5:
                    productsArr.sort((a, b) => a.discountPercentage - b.discountPercentage);
                    window.location.hash = hash.replace(/(sort=true)\d{0,}/, `sort=true${select.value}`);
                    break;
                case 6:
                    productsArr.sort((a, b) => b.discountPercentage - a.discountPercentage);
                    window.location.hash = hash.replace(/(sort=true)\d{0,}/, `sort=true${select.value}`);
                    break;
                default:
                    window.location.hash = hash.replace(/(&sort=true)\d{0,}/, ``);
                    break;
            }
        }
        if (this.findParametrs('search').length) {
            let allArr;
            const searchArr: productObject[] = [];
            if (productsArr.length !== 0) {
                allArr = productsArr;
            } else {
                allArr = await this.render(this.url);
            }
            const arr: string[] = this.findParametrs('search');
            allArr.forEach((item: productObject) => {
                if (item.title.toLocaleLowerCase().includes(arr[0].toLocaleLowerCase())) {
                    searchArr.push(item);
                }
            });
            productsArr = searchArr;
        }
        let cardList = '';
        productsArr.forEach((item: productObject) => {
            cardList += `
            <div class="main__block__card-field__card" data-id="${item.id}">
                    <div class="main__block__card-field__card__header">
                    <img class="main__block__card-field__card__header__img" src="${item.thumbnail}" loading="lazy" alt="${item.category}">
                    <a class = "main__block__card-field__card__header__anchor" data-id="${item.id}" href="/product_details/${item.id}"></a>
                    </div>
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
                    <button class="main__block__card-field__card__footer__button" data-btnid="${item.id}">ADD TO CARD</button>
                </div>
            </div>`;
        });
        const foundItem = document.querySelector('.main__block__header-found') as HTMLElement;
        foundItem.textContent = `Found: ${productsArr.length}`;

        const mainBlock = document.querySelector('.main__block__card-field');
        if (mainBlock) {
            mainBlock.innerHTML = cardList;
        }
        if (hash.indexOf('viewMode=small') !== -1) {
            this.viewModeSmall();
        } else if (hash.indexOf('viewMode=big') !== -1) {
            this.viewModeBig();
        }
    }
    mainBlockActionsInit() {
        document.querySelector('.main__block__header__view-mode__big')?.addEventListener('click', this.viewModeBig);
        document.querySelector('.main__block__header__view-mode__small')?.addEventListener('click', this.viewModeSmall);
        const select = document.querySelector('.main__block__header-select') as HTMLSelectElement;
        const search = document.getElementById('input_card') as HTMLInputElement;
        const hash: string = window.location.hash;
        select.addEventListener('change', () => {
            this.sortCards();
        });
        search.addEventListener('input', () => {
            this.searchCards(search.value);
        });
        if (this.findParametrs('sort')) {
            select.selectedIndex = +hash[hash.search(/(sort=true)\d{0,}/) + 9];
        }
        if (this.findParametrs('search')[0]) {
            search.value = this.findParametrs('search')[0];
        }
        const cardField = document.querySelector('.main__block__card-field') as HTMLElement;
        cardField.addEventListener('click', (event: Event) => {
            this.cardEvents(event);
        });
        this.createCardList();
        window.addEventListener('popstate', () => {
            this.createCardList();
        });
    }
    viewModeBig() {
        const cards = document.querySelectorAll<HTMLElement>('.main__block__card-field__card');
        const cardsInfo = document.querySelectorAll<HTMLElement>('.main__block__card-field__card__footer__info');
        const cardsImg = document.querySelectorAll<HTMLElement>('.main__block__card-field__card__header');
        const hash: string = window.location.hash;
        if (hash.indexOf('viewMode') === -1) {
            window.location.hash += `&viewMode=big`;
        } else {
            window.location.hash = hash.replace('small', 'big');
        }
        cards.forEach((item): void => {
            item.style.width = '300px';
        });
        cardsImg.forEach((item): void => {
            item.style.height = '200px';
        });
        cardsInfo.forEach((item): void => {
            item.classList.remove('hide');
        });
    }
    viewModeSmall() {
        const cards = document.querySelectorAll<HTMLElement>('.main__block__card-field__card');
        const cardsInfo = document.querySelectorAll<HTMLElement>('.main__block__card-field__card__footer__info');
        const cardsImg = document.querySelectorAll<HTMLElement>('.main__block__card-field__card__header');
        const hash: string = window.location.hash;
        if (hash.indexOf('viewMode') === -1) {
            console.log('hi');
            window.location.hash += `&viewMode=small`;
        } else {
            window.location.hash = hash.replace('big', 'small');
        }
        cards.forEach((item): void => {
            item.style.width = '200px';
        });
        cardsImg.forEach((item): void => {
            item.style.height = '150px';
        });
        cardsInfo.forEach((item): void => {
            item.classList.add('hide');
        });
    }
    cardEvents(event: Event) {
        const target = event.target;
        if (target instanceof HTMLAnchorElement && target.dataset.id !== undefined) {
            route(event);
            const detailsPage = new DetailsPage();
            detailsPage.renderDetailsPage();
        }
    }
    searchCards(text: string): void {
        const hash: string = window.location.hash;
        if (window.location.hash.indexOf('search') === -1) {
            window.location.hash += `&search=${text}`;
        } else {
            window.location.hash = hash.replace(`search=${this.findParametrs('search')[0]}`, `search=${text}`);
        }
        if (text === '') {
            window.location.hash = hash.replace(/(&search=)./, ``);
        }
        this.createCardList();
    }
    sortCards() {
        if (window.location.hash.indexOf('sort') === -1) {
            window.location.hash += `&sort=true`;
        }
        this.createCardList();
    }
    findParametrs(name: string): string[] {
        let parametr: string[] = [];
        const hash: string = window.location.hash;
        const parametrsArr: string[] = hash.split('&');
        parametrsArr.forEach((item) => {
            if (item.includes(name)) {
                parametr = item.slice(item.lastIndexOf('=') + 1).split(',');
            }
        });
        return parametr;
    }
    addToCart() {
        let productsInCart: string[];
        if (localStorage.getItem('productsInCart') && JSON.parse(localStorage.getItem('productsInCart') || '')) {
            productsInCart = JSON.parse(localStorage.getItem('productsInCart') || '');
        } else {
            productsInCart = [];
        }

        // const cardBtns = document.querySelectorAll('.main__block__card-field__card__footer__button');

        // if (productsInCart.length) {
        //     cardBtns.forEach((item)=> {
        //         if ()
        //     });
        // }

        function addActiveClass(item: HTMLElement) {
            item.classList.add('cart-active');
            item.textContent = 'DROP FROM CART';
        }
        function removeActiveClass(item: HTMLElement) {
            item.classList.remove('cart-active');
            item.textContent = 'ADD TO CART';
        }
        const cardField = document.querySelector('.main__block__card-field');
        if (cardField) {
            cardField.addEventListener('click', (e) => {
                if (e.target && e.target instanceof HTMLElement) {
                    if (e.target.classList.contains('main__block__card-field__card__footer__button')) {
                        const currentCardId = e.target.dataset.btnid;
                        if (currentCardId) {
                            if (e.target.classList.contains('cart-active')) {
                                removeActiveClass(e.target);
                                productsInCart = productsInCart.filter((item) => item !== currentCardId);
                            } else {
                                addActiveClass(e.target);
                                productsInCart.push(currentCardId);
                            }
                            localStorage.setItem('toCart', JSON.stringify(productsInCart));
                        }
                    }
                }
            });
        }
    }
}
const mainBlockInit = new ProductsCard();
mainBlockInit.mainBlockActionsInit();
mainBlockInit.addToCart();
