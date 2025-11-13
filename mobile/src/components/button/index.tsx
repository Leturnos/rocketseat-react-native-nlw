import { 
    TouchableOpacity, 
    TouchableOpacityProps, 
    Text, 
    TextProps,
    ActivityIndicator,
} from "react-native"

import {Icon123, IconProps as tablerIconProps} from "@tabler/icons-react-native"

import { styleSheet } from "./styles"
import { colors } from "@/styles/theme"

type ButtonProps = TouchableOpacityProps & {
    isLoading?:boolean
}
// ...rest = outras propriedades, tipo *
function Button({children, style, isLoading=false, ...rest} : ButtonProps) {
    return (
        <TouchableOpacity style={[styleSheet.container, style]} activeOpacity={0.5} disabled={isLoading} {...rest}>
            {isLoading ? (<ActivityIndicator size="small" color={colors.gray[100]}/>) : children}
        </TouchableOpacity>
    )
}

function Title({children} : TextProps) {
    return <Text style={styleSheet.title}>{children}</Text>
}

// como foi renomeado no import ele deixa
type IconProps = {
    icon: React.ComponentType<tablerIconProps>
}

function Icon({icon: Icon} : IconProps) {
    return <Icon size={24} color={colors.gray[100]}/>
}

Button.Title = Title
Button.Icon = Icon

export {Button}