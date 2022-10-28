export interface ICartState {
    products: IProductInfo[]
}

export interface IProductInfo {
    idProduct: number;
    name: string;
    price: number;
    image: string;
    product_in_card?: boolean;
}