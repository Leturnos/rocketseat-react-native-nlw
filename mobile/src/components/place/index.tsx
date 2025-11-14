import { Text, View, TouchableOpacity, TouchableOpacityProps, Image } from "react-native";

import { styleSheet } from "./styles";
import { IconTicket } from "@tabler/icons-react-native";
import { colors } from "@/styles/colors";

export type PlaceProps = {
    id: string
    name: string
    description: string
    coupons: number
    cover: string
    adress: string
}

type Props = TouchableOpacityProps & {
    data: PlaceProps
}


export function Place({data, ...rest}: Props){
    return(
        <TouchableOpacity style={styleSheet.container} {...rest}>
            <Image style={styleSheet.image} source={{uri: data.cover}}/>

            <View style={styleSheet.content}>
                <Text style={styleSheet.name}>{data.name}</Text>
                <Text style={styleSheet.description}>{data.description}</Text>
                
                <Text style={styleSheet.footer}>
                    <IconTicket size={16} color={colors.red.base}/>
                    <Text style={styleSheet.tickets}>{data.coupons} Cupons disponíveis</Text>
                </Text>

                
            </View>
        </TouchableOpacity>
    )
}