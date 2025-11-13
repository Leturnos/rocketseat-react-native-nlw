import { FlatList } from "react-native";

import { Category } from "../category";
import { styleSheet } from "./styles";

export type CategoriesProps = {
    id : string,
    name: string,
}[] // [] indica que é uma lista de categorias

type Props = {
    data: CategoriesProps
    selected: string
    onSelected: (id: string) => void
}

export function Categories({data, selected, onSelected}: Props){
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
            <Category
                name={item.name}
                iconId={item.id} 
                onPress={() => onSelected(item.id)}
                isSelected={item.id === selected}
                />
            )}
            horizontal
            showsHorizontalScrollIndicator
            contentContainerStyle={styleSheet.content}
            style={styleSheet.container}
            />
        )
}