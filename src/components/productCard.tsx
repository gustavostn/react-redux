
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { IProductInfo } from "../interfaces/productCard-interface"
import { decrement, decrementByAmount, increment, incrementByAmount } from "../redux/cart/counterSlice"

interface IProductCardProps {
    product: IProductInfo
}

interface ICartSlice {
    counter: {
        counter: number;
        resetValues: boolean;
    }
}

function ProductCard(props: IProductCardProps) {

    const { product } = props
    const { resetValues } = useSelector((counterSlice: ICartSlice) => counterSlice.counter)

    const dispatch = useDispatch()

    const [labelButton, setLabelButton] = useState<string>("Adicionar produto no carrinho")

    const [productInfo, setProductInfo] = useState<IProductInfo>({
        idProduct: 0,
        image: "",
        name: "",
        price: 0,
        product_in_card: false
    })

    const [productQty, setProductQty] = useState(1)

    useEffect(() => {
        setProductInfo(product)
        setLabelButton(getButtonLabel(Boolean(product.product_in_card)))
    }, [product])

    useEffect(() => {
        if(!resetValues) return
        setProductQty(1)
    }, [resetValues])
    
    function handleClickInProductButton(): void {
        const productInCart = !productInfo.product_in_card
        productInfo.product_in_card = productInCart
        setProductInfo(productInfo)
        setLabelButton(getButtonLabel(productInCart))
        handleProductsInCart(productInCart)
    }

    function getButtonLabel(productInCart: boolean): string {
        if (productInCart) return "Remover produto do carrinho"
        return "Adicionar produto no carrinho"
    }

    function handleProductsInCart(addProduct: boolean): void {
        if (addProduct) {
            if(productQty === 1) {
                dispatch(increment())
                return
            }
            dispatch(incrementByAmount(productQty))
            return
        }

        setProductQty(1)
        if(productQty === 1) {
            dispatch(decrement())
            return
        }
        dispatch(decrementByAmount(productQty))
    }

    function handleProductQty(action: "INCREMENT" | "DECREMENT"): void {
        if(action === "INCREMENT") {
            setProductQty(productQty + 1)
            return
        }
        if(productQty === 1) return
        setProductQty(productQty - 1)
    }

    return (
        <div
            key={productInfo.idProduct}
            className="flex-column rounded-lg w-64 text-white"
        >
            <img
                src={productInfo.image}
                alt={`Imagem do produto ${productInfo.name}`}
                className="rounded-t-lg object-cover min-w-[100%] max-h-[130px] mb-4"
            />
            <div className="flex w-full justify-between">
                <span className="font-bold">{productInfo.name}</span>
                <span className="text-green-500">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(productInfo.price)}</span>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-full">
                <button
                    type="submit"
                    className={`mt-2 w-full p-2 text-black rounded-md ${productInfo.product_in_card ? "bg-red-400 hover:bg-red-600" : "bg-green-500 hover:bg-green-700"}`}
                    onClick={handleClickInProductButton}
                >{labelButton}</button>

                <div 
                    className={`flex flex-inline justify-center gap-4 w-full max-w-full ${productInfo.product_in_card ? "opacity-40 pointer-events-none" : ""}`}
                >
                    <button
                        type="button"
                        onClick={_ => handleProductQty("DECREMENT")}
                        className="text-red-700 text-white font-bold hover:text-red-500 px-5 h-10 border rounded-lg border-red-700 hover:border-red-500"
                        disabled={productInfo.product_in_card}
                    >-</button>
                    <input
                        type="text"
                        value={productQty}
                        className="text-center flex max-w-[50%] h-10 p-2 text-white bg-transparent border-1 border rounded-lg border-zinc-700"
                        readOnly
                    />
                    <button
                        type="button"
                        onClick={_ => handleProductQty("INCREMENT")}
                        className="text-green-700 text-white font-bold hover:text-green-500 px-5 h-10 border rounded-lg border-green-700 hover:border-green-500"
                        disabled={productInfo.product_in_card}
                    >+</button>
                </div>
            </div>

        </div>
    )
}

export default ProductCard