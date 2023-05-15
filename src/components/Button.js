import { Button as NativeBaseBtn } from "native-base";
import { ButtonProps } from "react-native";

export function Button({title, type, onPress, selected}){
    return(
        <NativeBaseBtn bgColor={selected? "gray.800" : "#969696"} w="48" _text={{
            color: type === "primary"? "#000000": "blue.700",
            fontWeight: "bold"
        }} mb={3} onPress={onPress}>{title}</NativeBaseBtn>
    );
}