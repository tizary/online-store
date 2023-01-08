export interface productObject {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
}

export class Products {
    url = 'https://dummyjson.com/products?limit=100';
    async render(url: string) {
        const response = await fetch(url);
        if (response.status === 200) {
            const data = await response.json();
            const productsArr = data.products;
            return productsArr;
        } else {
            console.log('errrrr');
        }
    }
}
