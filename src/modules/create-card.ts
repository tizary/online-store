export class Card {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    constructor(
        cardId: number,
        cardTitle: string,
        cardDescription: string,
        cardPrice: number,
        cardDiscountPercentage: number,
        cardRating: number,
        cardStock: number,
        cardBrand: string,
        cardCategory: string,
        cardThumbnail: string,
        cardImages: string[]
    ) {
        this.id = cardId;
        this.title = cardTitle;
        this.description = cardDescription;
        this.price = cardPrice;
        this.discountPercentage = cardDiscountPercentage;
        this.rating = cardRating;
        this.stock = cardStock;
        this.brand = cardBrand;
        this.category = cardCategory;
        this.thumbnail = cardThumbnail;
        this.images = cardImages;
    }
    createCard() {
        const cardField = document.querySelector('.main__block__card-field');
        const card = document.createElement('div');
        card.classList.add('main__block__card-field__card');
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('main__block__card-field__card__header');
        cardHeader.style.background = `url(${this.thumbnail}) top center/ 100% 100% no-repeat`;
        card?.append(cardHeader);
        const cardInfo = document.createElement('div');
        cardInfo.classList.add('main__block__card-field__card__header__info');
        cardInfo.classList.add('hide');
        const cardCategory = document.createElement('p');
        cardCategory.textContent = `Categoty: ${this.category}`;
        const cardBrand = document.createElement('p');
        cardBrand.textContent = `Brand: ${this.brand}`;
        const cardPrice = document.createElement('p');
        cardPrice.textContent = `Price: ${this.price}`;
        const cardDiscount = document.createElement('p');
        cardDiscount.textContent = `Discount: ${this.discountPercentage}`;
        const cardRating = document.createElement('p');
        cardRating.textContent = `Rating: ${this.rating}`;
        const cardStock = document.createElement('p');
        cardStock.textContent = `Stock: ${this.stock}`;
        cardInfo?.append(cardCategory);
        cardInfo?.append(cardBrand);
        cardInfo?.append(cardPrice);
        cardInfo?.append(cardDiscount);
        cardInfo?.append(cardRating);
        cardInfo?.append(cardStock);
        cardHeader?.append(cardInfo);
        const cardInfoOpen = document.createElement('div');
        cardInfoOpen.textContent = 'Info ⋁';
        cardInfoOpen.classList.add('main__block__card-field__card__header__arrow');
        cardInfoOpen.addEventListener('click', () => {
            cardInfoOpen.textContent === 'Info ⋁'
                ? (cardInfoOpen.textContent = 'Info ⋀')
                : (cardInfoOpen.textContent = 'Info ⋁');
            cardInfo.classList.toggle('hide');
        });
        cardHeader?.append(cardInfoOpen);
        const cardFooter = document.createElement('div');
        cardFooter.classList.add('main__block__card-field__card__footer');
        card?.append(cardFooter);
        const cardName = document.createElement('div');
        cardName.textContent = `${this.title}`;
        cardName.classList.add('main__block__card-field__card__footer__name');
        cardFooter?.append(cardName);
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('main__block__card-field__card__footer__button-container');
        cardFooter?.append(buttonContainer);
        const addToCardButton = document.createElement('button');
        addToCardButton.textContent = 'ADD TO CARD';
        addToCardButton.classList.add('main__block__card-field__card__footer__button-container__button');
        buttonContainer?.append(addToCardButton);
        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'DETAILS';
        detailsButton.classList.add('main__block__card-field__card__footer__button-container__button');
        buttonContainer?.append(detailsButton);
        cardField?.append(card);
    }
}
