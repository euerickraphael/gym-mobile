import { Input } from "native-base";

export function InputCamp({onChangeText, value, placeholder, w, maxLength, isRequired, mb}){
    return(
        <Input mb={mb} onChangeText={(valor) => onChangeText(valor)} value={value} bgColor="#969696" borderRadius="lg" placeholder={placeholder} mx="20" placeholderTextColor="black" w={w} maxLength={maxLength} isRequired={isRequired}/>
    )
}