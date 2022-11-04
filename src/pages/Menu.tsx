import mock from "../server/products-mock.json"

import ProductCard from "../components/productCard"

import { IProductInfo } from "../interfaces/productCard-interface"
import { useDispatch, useSelector } from "react-redux"
import { clearValues, reset } from "../redux/cart/counterSlice"
import { useEffect, useState } from "react"

function Menu() {

    const dispatch = useDispatch()
    const count = useSelector((state: any) => state.counter.counter)

    const [products, setProducts] = useState<any[]>([])

    useEffect(() => {
        setProducts(mock)

        return () => {
            setProducts([])
        }
    }, [mock])


    function handleResetCart(): void {
        const allProducts = products.map((product: IProductInfo) => {
            product.product_in_card = false
            return product
        })

        setProducts(allProducts)
        dispatch(reset())
        setTimeout(() => { dispatch(clearValues()) }, 200);
    }

    return (
        <div className="container-sm flex flex-col justify-center align-center">
            <div className="inline-flex align-center justify-between mb-8">
                <h2 className="flex justify-center items-center text-white font-bold text-3xl">
                    Produtos no carrinho {count}
                </h2>
                <button
                    className="mt-2 w-full p-2 rounded-md bg-transparent border border-red-600 text-white w-40 max-h-10 hover:bg-red-600"
                    onClick={_ => handleResetCart()}
                >Limpar carrinho</button>
            </div>
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