import { Text, Pressable, PressableProps } from "react-native"

import { styleSheet } from "./styles"
import { colors } from "@/styles/theme"
import { categoriesIcons } from "@/utils/categories-icons"

type Props = PressableProps & {
    iconId: string,
    isSelected?:boolean,
    name: string
}

export function Category({name,iconId,isSelected=false, ...rest} : Props){
    const Icon = categoriesIcons[iconId]

    return(
        <Pressable style={[styleSheet.container, isSelected && styleSheet.containerSelected]}
        {...rest}> 
            <Icon size={16} color={colors.gray[isSelected ? 100 : 400]}/>
            <Text style={[styleSheet.name, isSelected && styleSheet.nameSelected]}>{name}</Text>
        </Pressable>
    )
}