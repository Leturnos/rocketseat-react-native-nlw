import { colors, fontFamily } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styleSheet = StyleSheet.create({
    logo: {
        width: 48,
        height: 48,
        marginBottom: 28,
        marginTop: 24
    },
    title: {
        fontSize: 24,
        fontFamily: fontFamily.bold,
        color: colors.gray[600]
    },
    subtitle: {
        fontFamily: fontFamily.regular,
        fontSize: 16,
        color: colors.gray[500],
        marginTop: 12
    },
})