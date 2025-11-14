import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { api } from "@/services/api";

import { Places } from "@/components/places";
import { PlaceProps } from "@/components/place";
import { Categories, CategoriesProps } from "@/components/categories";
import { colors } from "@/styles/colors";

type MarketProps = PlaceProps 

export default function Home(){
    const [categories, setCategories] = 
    useState<CategoriesProps>([]) // generic, esse estado é desse tipo, de início é uma lista vazia
    const [category, setCategory] = useState("")
    const [markets, setMarkets] = useState<MarketProps[]>([])

    async function fetchCategories() {
        try{
            const {data} = await api.get("/categories")
            setCategories(data)
            setCategory(data[0].id)
        } catch (error){
            console.log(error)
            Alert.alert("Categorias", "Não foi possível carregar as categorias...")
        }
    }

    async function fetchPlaces() {
        try {
            if (!category){
                return 
            }
            const { data } = await api.get("/markets/category/" + category)
            setMarkets(data)
        } catch (error) {
            console.log(error)
            Alert.alert("Locais", "Não foi possível carregar os locais...")
        }
    }

    useEffect(() => {
        fetchCategories()
    }, []) // "[]" é dependência, para recarregar não apenas na hora da renderização 

    useEffect(() => {
        fetchPlaces()
    }, [category]) // só carrega quando tiver category

    return (
        <View style={{flex:1 , backgroundColor: colors.green.soft}}>
            <Categories data={categories} onSelected={setCategory} selected={category}/>
        
            <Places data={markets} />
        </View>
    )
}