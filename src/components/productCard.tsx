
import { useEffect, useState } from "react"

import { IProductInfo } from "../interfaces/productCard-interface"

interface IProductCardProps {
    product: IProductInfo
}

function ProductCard(props: IProductCardProps) {

    const { product } = props

    const [labelButton, setLabelButton] = useState<string>("Adicionar produto no carrinho") 

    const [productInfo, setProductInfo] = useState<IProductInfo>({ 
        idProduct: 0, 
        image: "", 
        name: "", 
        price: 0,
        product_in_card: false
    })

    useEffect(() => {
        setProductInfo(product)
        setLabelButton(getButtonLabel(Boolean(product.product_in_card)))
    }, [product])

    
    function handleClickInProductButton(): void {
        productInfo.product_in_card = !productInfo.product_in_card
        setProductInfo(productInfo)
        setLabelButton(getButtonLabel(productInfo.product_in_card))    
    }

    function getButtonLabel(productInCart: boolean): string {
        if(productInCart) return "Remover produto do carrinho"
        return "Adicionar produto no carrinho"
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
            <button
                type="submit"
                className={`mt-2 w-full p-2 text-black rounded-md ${productInfo.product_in_card ? "bg-red-400 hover:bg-red-600" : "bg-green-500 hover:bg-green-700"}`}
                onClick={handleClickInProductButton}
            >{labelButton}</button>
        </div>
    )
}

export default ProductCard