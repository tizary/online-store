export const cartPage = `
    <div class="wrapper">
        <div class="main__container">
            <div class="cart__block">
                <div class="cart__block-header">
                    <p class="cart__block-title">Products In Cart</p>
                </div>
                <div class="cart__block-list">
                    <span class="item-number">1</span>
                    <div class="img-container">
                        <img class="item-img" src="https://i.dummyjson.com/data/products/1/thumbnail.jpg"></img>
                    </div>
                    <div class="item-desc">
                        <p class="item-title">Nokia</p>
                        <p>Description: <span class="item-text">Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched</span></p>
                        <p>Discount: <span class="item-text">4.15</span></p>
                        <p>Rating: <span class="item-text">4.25</span></p>
                    </div>
                    <div class="item-price-info">
                        <p class="item-price">1,499.00</p>
                        <div class="item-count">
                            <button class="btn-minus">-</button>
                            <span>1</span>
                            <button class="btn-plus">+</button>
                        </div>
                        <p>Stock: <span class="item-text">50</span></p>
                    </div>
                </div>
                <div class="item-line"></div>
            </div>
            <div class="cart__summary">
                <p class="cart__summary-title">Summary</p>
                <div class="cart__summary-description">
                    <p>Products: <span class="cart-count"></span></p>
                    <p>Total: <span class="cart-total-price"></span></p>
                    <button class="btn buy-btn">BUY NOW</button>
                </div>
            </div>
        </div>
    </div>
`;
