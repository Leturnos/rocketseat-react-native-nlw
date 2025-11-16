import { Text, useWindowDimensions } from "react-native";
import BottomSheet, {BottomSheetFlatList} from "@gorhom/bottom-sheet"
import { router, Router } from "expo-router";

import { Place, PlaceProps } from "../place"
import { useRef } from "react";
import { styleSheet } from "./styles";

type Props = {
    data: PlaceProps[]
}

export function Places ({data}: Props) {
    const dimensions = useWindowDimensions()
    const bottomSheetRef = useRef<BottomSheet>(null)

    const snapPoints = {
        min: 278,
        max: dimensions.height - 128
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[snapPoints.min, snapPoints.max]} // pontos onde o bottom sheet para
            handleIndicatorStyle={styleSheet.indicator}
            backgroundStyle={styleSheet.container}
            enableOverDrag={false}
        >
            <BottomSheetFlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <Place data={item} onPress={() => router.navigate(`/market/${item.id}`)}
                    />
                )}
                contentContainerStyle={styleSheet.content}
                ListHeaderComponent={()=>(
                    <Text style={styleSheet.title}>Explore locais perto de você</Text>
                )}
                showsVerticalScrollIndicator={false}
            />
        </BottomSheet>
    )
}