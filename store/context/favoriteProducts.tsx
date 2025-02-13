import { createContext, useState } from "react";
interface favProductInterface {
    favIds: string[]
    add: (id:string) => void
    remove: (id:string) => void
}
const favProductValue:favProductInterface = {
    favIds: [],
    add: (id: string) => { },
    remove: (id: string) => { }
}
export const FavoriteProducts = createContext(favProductValue)

const FavoriteProductsProvider = (props: any) => {
    const [favIds, setFavIds] = useState<any>([])
    const add = (id: string) => {
        setFavIds((previousValue: any) => ([...previousValue, id]))
    }
    const remove = (id: string) => {
        setFavIds((previousValue: any) => (previousValue.filter((currentId: string) => currentId !== id)))
    }
    const value = {
        favIds, add, remove
    }
    return <FavoriteProducts.Provider children={props.children} value={value}></FavoriteProducts.Provider>
}
export default FavoriteProductsProvider