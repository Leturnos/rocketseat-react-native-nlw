import { View, Text } from "react-native";
import { IconPhone,IconMapPin, IconTicket } from "@tabler/icons-react-native";

import { Info } from "../info";
import { styleSheet } from "./styles";

export type PropsDetails = {
    name: string
    description: string
    address: string
    phone: string
    coupons: number
    rules : {
        id: string
        description: string
    }[]
}

type Props = {
    data: PropsDetails
}

export function Details({data}: Props) {
    return (
        <View style={styleSheet.container}>
            <Text style={styleSheet.name}>{data.name}</Text>
            <Text style={styleSheet.description}>{data.description}</Text>

            <View style={styleSheet.group}>
                <Text style={styleSheet.title}>Informações</Text>

                <Info icon={IconTicket} description={`${data.coupons} cupons disponíveis`}/>
                <Info icon={IconMapPin} description={data.address}/>
                <Info icon={IconPhone} description={data.phone}/>
            </View>

            <View style={styleSheet.group}>
                <Text style={styleSheet.title}>Regulamentos</Text>
                { data.rules.map((item) => (
                    <Text
                     key={item.id} style={styleSheet.rule}
                    >
                        {`\u2022 ${item.description}`}  
                    </Text>
                    // esse código acima é o simbolo de uma bolinha preta
                ))}
            </View>
        </View>
    )
}