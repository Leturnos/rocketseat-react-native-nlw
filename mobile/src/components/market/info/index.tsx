import { Text, View } from "react-native";
import { Icon, IconProps } from "@tabler/icons-react-native";

import {stylesheet} from "./styles";
import { colors } from "@/styles/theme";

type Props = {
    description : string
    icon: React.ComponentType<IconProps>
}

export function Info({icon: Icon, description} : Props) {
    return(
        <View style={stylesheet.container}>
            <Icon size={16} color={colors.gray[400]}/>
            <Text style={stylesheet.text}>{description}</Text>
        </View>
    )
}