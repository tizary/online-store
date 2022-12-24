export interface productObject {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: ImagesArray;
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
}
export interface ImagesArray {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
}

export class Products {
    async render() {
        const url = 'https://dummyjson.com/products?limit=100';
        const response = await fetch(url);
        const data = await response.json();
        const productsArr = data.products;
        return productsArr;
    }
}
