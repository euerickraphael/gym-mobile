import { useToast, VStack } from "native-base";
import { useState } from "react";
import { ImageBackground, Dimensions, SafeAreaView } from "react-native";
import HoldingHalter from "../assets/HoldingHalter.png";
import { Button } from "../components/Button";
import { InputCamp } from "../components/InputCamp";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export function AuthScreen() {

    const width = Dimensions.get("screen").width
    const height = Dimensions.get("screen").height

    const toast = useToast();

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const {navigate} = useNavigation();

    async function handleLogin(){
        const UserResponse = await axios.get(`http://192.168.1.111:3000/users?email_like=${email}`)
        if (UserResponse.data[0].password === senha){
            navigate("home", {email: email});
            return toast.show({
                placement: "top",
                title: "Login realizado com sucesso.",
            });
        }
        else if (UserResponse.data[0].password != senha) {
            setSenha("")
            return toast.show({
                placement: "top",
                title: "Senha incorreta - O sistema diverge maiúsculas e minúsculas!",
            });
        }
        setSenha("")
        setEmail("")
        return toast.show({
            placement: "top",
            title: "Falha ao logar.",
        });

    }

    return (
        <ImageBackground
            source={HoldingHalter}
            style={{
                width: width,
                height: height,
            }}
        >
            <SafeAreaView>
                <VStack alignItems="center" justifyContent="center" h={height}>
                    <InputCamp
                        placeholder="email"
                        mb={5}
                        onChangeText={setEmail}
                        value={email}
                    />
                    <InputCamp
                        placeholder="senha"
                        mb={5}
                        onChangeText={setSenha}
                        value={senha}
                    />
                    <Button title="Login" type="primary" onPress={handleLogin}/>
                </VStack>
            </SafeAreaView>
        </ImageBackground>
    );
}
