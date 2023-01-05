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
