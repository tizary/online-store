export const mainPage = `
            <div class="wrapper">
                <div class="main__container">
                    <aside class="aside">
                        <div class="aside__options">
                            <button class="btn reset-btn"><a href="/">Reset Filters</a></button>
                            <button class="btn copy-btn">Copy Link</button>
                        </div>
                        <div class="aside__category">
                            <h2 class="aside__title">Category</h2>
                            <div class="aside__category-list">

                            </div>
                        </div>
                        <div class="aside__brand">
                            <h2 class="aside__title">Brand</h2>
                                <div class="aside__brand-list">

                                </div>
                        </div>
                        <div class="aside__price">
                            <h2 class="aside__title">Price, </h2>
                            <div class="aside__price-block"></div>
                        </div>
                        <div class="aside__stock">
                            <h2 class="aside__title">Stock</h2>
                            <div class="aside__stock-block"></div>
                        </div>
                    </aside>
                    <div class="main__block">
                        <div class="main__block__header">
                            <select id = 'select' class="main__block__header-select">
                                <option value="" selected>Sort products</option>
                                <option value="1">Sort by price min-max</option>
                                <option value="2">Sort by price max-min</option>
                                <option value="3">Sort by rating min-max</option>
                                <option value="4">Sort by rating max-min</option>
                                <option value="5">Sort by discount min-max</option>
                                <option value="6">Sort by discount max-min</option>
                            </select>
                            <div class="main__block__header-found">Found:</div>
                            <input placeholder="Search product" type="text" id="input_card" class="main__block__header-search">
                            <div class="main__block__header__view-mode">
                                <div class="main__block__header__view-mode__small"></div>
                                <div class="main__block__header__view-mode__big"></div>
                            </div>
                        </div>
                        <div class="main__block__card-field"></div>
                    </div>
                </div>
            </div>
`;
