import { Image, Text, View } from "react-native";

import { styleSheet } from "./styles";

export function Welcome(){
    return (
        <View>
            <Image source={require("@/assets/logo.png")} style={styleSheet.logo}/>
        
            <Text style={styleSheet.title}>Boas vindas ao Nearby!</Text>

            <Text style={styleSheet.subtitle}>Tenha cupons de vantagem para usar em seus estabelecimentos favoritos.</Text>
        </View>
    )
}