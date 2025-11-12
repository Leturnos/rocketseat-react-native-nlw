import { Text, View } from "react-native";
import { colors } from "@/styles/colors";
import { styleSheet } from "./style";
import { IconProps } from "@tabler/icons-react-native";

type Props = {
    title: string
    description: string
    icon: React.ComponentType<IconProps>
}
export function Step({title, description, icon: Icon}:Props){
    return(
        <View style={styleSheet.container}>
            {Icon && <Icon size={30} color={colors.red.base}/>} 
            <View style={styleSheet.details}>
                <Text style={styleSheet.title}>{title}</Text>
                <Text style={styleSheet.description}>{description}</Text>
            </View>
        </View>
    )
}