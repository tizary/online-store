export class MainBlockActions {
    mainBlockActionsInit() {
        document.querySelector('.main__block__header__view-mode__big')?.addEventListener('click', this.viewModeBig);
        document.querySelector('.main__block__header__view-mode__small')?.addEventListener('click', this.viewModeSmall);
        document.querySelector('.main__block__header-select')?.addEventListener('change', this.sortCards);
        const cardField = document.querySelector('.main__block__card-field') as HTMLElement;
        cardField.addEventListener('click', (event: MouseEvent) => {
            this.cardEvents(event);
        });
    }
    viewModeBig() {
        const cards = document.querySelectorAll<HTMLElement>('.main__block__card-field__card');
        const cardsInfo = document.querySelectorAll<HTMLElement>('.main__block__card-field__card__footer__info');
        const cardsImg = document.querySelectorAll<HTMLElement>('.main__block__card-field__card__header');
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
        // const cardButton = document.querySelectorAll(
        //     '.main__block__card-field__card__footer__button'
        // ) as NodeListOf<Element>;
        const cardButton2 = document.querySelector('.main__block__card-field__card__footer__button') as HTMLElement;
        const target = event.target;
        if (target != null) {
            console.log(target);
        }

        if (event.target != cardButton2) {
            console.log('не кнопка');
        } else {
            console.log('кнопка');
        }
    }
    sortCards() {
        // console.log(document.querySelector<HTMLElement>('.main__block__header-select')?.);
    }
}

const mainBlockInit = new MainBlockActions();
mainBlockInit.mainBlockActionsInit();
