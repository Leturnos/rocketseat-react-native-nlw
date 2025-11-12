import { colors, fontFamily } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styleSheet = StyleSheet.create({
    container: {
        gap: 24,
        flex:1,
    },
    title: {
        fontFamily: fontFamily.regular, 
        fontSize: 16,
        color: colors.gray[500],
    },
})