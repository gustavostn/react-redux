import products from "../server/products-mock.json"

import ProductCard from "../components/productCard"

import { IProductInfo } from "../interfaces/productCard-interface"

function Menu() {

    return (
        <div className="grid grid-cols-3 gap-4">
            {
                products.map((product: IProductInfo) => {
                    return (
                        <div key={product.idProduct}>
                            <ProductCard product={product} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Menu