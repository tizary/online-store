import products from './products.json';
import { Card } from './create-card';

products.forEach((item) => {
    const newCard = new Card(
        item.id,
        item.title,
        item.description,
        item.price,
        item.discountPercentage,
        item.rating,
        item.stock,
        item.brand,
        item.category,
        item.thumbnail,
        item.images
    );
    newCard.createCard();
});
function viewModeBig() {
    const cards = document.querySelectorAll<HTMLElement>('.main__block__card-field__card');
    const cardsHeader = document.querySelectorAll<HTMLElement>('.main__block__card-field__card__header');
    const button = document.querySelectorAll<HTMLElement>(
        '.main__block__card-field__card__footer__button-container__button'
    );
    cards.forEach((item) => {
        item.style.height = '230px';
        item.style.width = '200px';
    });
    button.forEach((item) => {
        item.style.width = '80px';
    });
    cardsHeader.forEach((item) => {
        item.style.height = '60%';
    });
}
function viewModeSmall() {
    const cards = document.querySelectorAll<HTMLElement>('.main__block__card-field__card');
    const cardsHeader = document.querySelectorAll<HTMLElement>('.main__block__card-field__card__header');
    const button = document.querySelectorAll<HTMLElement>(
        '.main__block__card-field__card__footer__button-container__button'
    );
    cards.forEach((item) => {
        item.style.height = '300px';
        item.style.width = '300px';
    });
    button.forEach((item) => {
        item.style.width = '120px';
    });
    cardsHeader.forEach((item) => {
        item.style.height = '70%';
    });
}
document.querySelector('.main__block__header__view-mode__big')?.addEventListener('click', viewModeBig);
document.querySelector('.main__block__header__view-mode__small')?.addEventListener('click', viewModeSmall);
