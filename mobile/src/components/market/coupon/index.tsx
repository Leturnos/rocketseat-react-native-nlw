import { Text, View } from "react-native";
import { IconTicket } from "@tabler/icons-react-native";

import { styleSheet } from "./styles";
import { colors } from "@/styles/theme";

type Props = {
    code: string
}

export function Coupon({code}:Props){
    return(
        <View style={styleSheet.container}>
            <Text style={styleSheet.title}>Utilize esse cupom</Text>
            <View style={styleSheet.content}>
                <IconTicket size={24} color={colors.green.light}/>
                <Text style={styleSheet.code}>{code}</Text>
            </View>
        </View>
    )
}