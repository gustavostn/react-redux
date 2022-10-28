import products from "../server/products-mock.json"

import ProductCard from "../components/productCard"

import { IProductInfo } from "../interfaces/productCard-interface"
import { useSelector } from "react-redux"
import { useEffect } from "react"

function Menu() {
    const count =  useSelector((state: any) => state.counter.counter)
    
    useEffect(() => {
      console.log(count);
    }, [count])
    

    return (
        <div className="w-full flex flex-col justify-center align-center">
            <h2 className="w-full flex justify-center align-center text-white font-bold text-3xl py-8">
                Produtos no carrinho {count}
            </h2>
            <div className="grid grid-cols-3 gap-4 justify-items-center">
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
        </div>
    )
}

export default Menu