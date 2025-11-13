import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { api } from "@/services/api";

import { Categories, CategoriesProps } from "@/components/categories";

export default function Home(){
    const [categories, setCategories] = 
    useState<CategoriesProps>([]) // generic, esse estado é desse tipo, de início é uma lista vazia
    const [category, setCategory] = useState("")

    async function fetchCaregories() {
        try{
            const {data} = await api.get("/categories")
            setCategories(data)
            setCategory(data[0].id)
        } catch (error){
            console.log(error)
            Alert.alert("Categorias", "Não foi possível carregar as categorias...")
        }
    }

    useEffect(() => {
        fetchCaregories()
    }, []) // "[]" é dependência, para recarregar não apenas na hora da renderização 


    return (
        <View style={{flex:1}}>
            <Categories data={categories} onSelected={setCategory} selected={category}/>
        </View>
    )
}