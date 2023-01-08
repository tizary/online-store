import { Products, productObject } from './rednerProducts';
import { localStore } from './localStore';
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
        const headerPriceAmount = document.querySelector('.header__price-amount');
        const priceStore = localStore.getPrice();
        if (headerPriceAmount) {
            headerPriceAmount.textContent = priceStore.reduce((acc: number, item: string) => +acc + +item, 0);
        }
        const productsStore = localStore.getProducts();
        const cartCount = document.querySelector('.header__cart-count');
        if (cartCount) {
            cartCount.textContent = productsStore.length;
        }
        productsArr.forEach((item: productObject) => {
            let activeClass = '';
            let activeText = '';

            if (productsStore.indexOf(`${item.id}`) === -1) {
                activeText = 'ADD TO CART';
            } else {
                activeClass = ' cart-active';
                activeText = 'DROP FROM CART';
            }

            cardList += `
            <div class="main__block__card-field__card" data-id="${item.id}">
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
                    <button class="main__block__card-field__card__footer__button${activeClass}" data-btnid="${item.id}" data-btnprice="${item.price}">${activeText}</button>
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
    async mainBlockActionsInit() {
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
        cardField.addEventListener('click', (event: MouseEvent) => {
            this.cardEvents(event);
        });
        await this.createCardList();
        this.addToCart();
    }
    viewModeBig() {
        const cards = document.querySelectorAll<HTMLElement>('.main__block__card-field__card');
        const cardsInfo = document.querySelectorAll<HTMLElement>('.main__block__card-field__card__footer__info');
        const cardsImg = document.querySelectorAll<HTMLElement>('.main__block__card-field__card__header');
        const hash: string = window.location.hash;
        if (hash.indexOf('viewMode') === -1) {
            console.log('hi');
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
    cardEvents(event: MouseEvent) {
        // const cardButton2 = document.querySelector('.main__block__card-field__card__footer__button') as HTMLElement;
        const target = event.target;
        if (target != null) {
            console.log(target);
        }
        // if (event.target != cardButton2) {
        //     console.log('не кнопка');
        // } else {
        //     console.log('кнопка');
        // }
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
    changeClick(e: Event) {
        const cartCount = document.querySelector('.header__cart-count');
        const headerPriceAmount = document.querySelector('.header__price-amount');
        if (e.target && e.target instanceof HTMLElement) {
            if (e.target.classList.contains('main__block__card-field__card__footer__button')) {
                const currentCardId = e.target.dataset.btnid;
                const currentCardPrice = e.target.dataset.btnprice;
                if (currentCardId && currentCardPrice) {
                    const { pushProduct, productsInCart } = localStore.putProducts(currentCardId);
                    if (pushProduct) {
                        e.target.classList.add('cart-active');
                        e.target.innerHTML = 'DROP FROM CART';
                    } else {
                        e.target.classList.remove('cart-active');
                        e.target.innerHTML = 'ADD TO CART';
                    }
                    if (cartCount) {
                        cartCount.textContent = productsInCart.length;
                    }
                    const { priceInCart } = localStore.putPrice(currentCardPrice);
                    if (headerPriceAmount) {
                        headerPriceAmount.textContent = priceInCart.reduce(
                            (acc: number, item: string) => +acc + +item,
                            0
                        );
                    }
                    const { countInCart } = localStore.putCountFirst(currentCardId);
                    console.log(countInCart);
                }
            }
        }
    }
    addToCart() {
        const cardField = document.querySelector('.main__block__card-field');
        if (cardField) {
            cardField.addEventListener('click', this.changeClick, false);
        }
    }
}
const mainBlockInit = new ProductsCard();
mainBlockInit.mainBlockActionsInit();
