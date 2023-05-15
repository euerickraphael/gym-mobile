import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Pressable, VStack, Text, Input, HStack, useToast } from "native-base";
import { useState } from "react";
import { ImageBackground, Dimensions, SafeAreaView } from "react-native";
import HoldingHalter from "../assets/HoldingHalter.png";
import { Button } from "../components/Button";
import { InputCamp } from "../components/InputCamp";

export function CadastroScreen(){

    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;

    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("")
    const [confirmSenha, setConfirmSenha] = useState("")
    const [type, setType] = useState("cliente")

    const {goBack} = useNavigation();

    const toast = useToast();

    async function handleCadastro(){

        const UserResponse = await axios.get(
            `http://192.168.1.111:3000/users?email_like=${email}`
        );

        console.log(UserResponse.data.length);

        if (senha === confirmSenha && (nome != "" && cpf != "" && telefone != "" && email != "" && senha != "" && confirmSenha != "") && UserResponse.data.length === 0) {
            await axios.post("http://192.168.1.111:3000/users", {
                name: nome,
                cpf: cpf,
                fone: telefone,
                email: email,
                password: senha,
                type: type,
            });
            setType("cliente")
            setEmail("")
            setConfirmSenha("")
            setSenha("")
            setNome("")
            setCpf("")
            setTelefone("")
            goBack();
            return toast.show({
                placement: "top",
                title: "Usuário criado com sucesso",
            });
        }

        else if (UserResponse.data.length != 0){
            
            return toast.show({
                placement: "top",
                title: "Já existe um usuário com este email"
            })
        }

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
                <VStack
                    justifyContent="space-between"
                    alignItems="center"
                    py={20}
                    px={5}
                    h={height}
                >
                    <VStack justifyContent="space-between" h={height / 3}>
                        <InputCamp
                            placeholder="Nome"
                            w={300}
                            onChangeText={setNome}
                            
                        />
                        <InputCamp
                            placeholder="CPF"
                            onChangeText={setCpf}
                            value={cpf}
                            maxLength={11}
                            
                        />
                        <InputCamp
                            placeholder="Telefone"
                            onChangeText={setTelefone}
                            value={telefone}
                            maxLength={11}
                            
                        />
                        <InputCamp
                            placeholder="Email"
                            onChangeText={setEmail}
                            value={email}
                            
                        />
                        <InputCamp
                            placeholder="Senha"
                            onChangeText={setSenha}
                            value={senha}
                            maxLength={8}
                            
                        />
                        <InputCamp
                            placeholder="Confirme a senha"
                            onChangeText={setConfirmSenha}
                            value={confirmSenha}
                            maxLength={8}
                            
                        />
                    </VStack>
                    <VStack>
                        <Button
                            title="Sou cliente"
                            type="primary"
                            onPress={() => setType("cliente")}
                            selected={type === "cliente" ? true : false}
                        />
                        <Button
                            title="Sou personal"
                            type="primary"
                            onPress={() => setType("personal")}
                            selected={type === "personal" ? true : false}
                        />
                    </VStack>
                    <VStack alignItems="center">
                        <Button
                            title="Cadastre-se"
                            type="primary"
                            onPress={handleCadastro}
                        />
                        <Pressable>
                            <Text color="white" underline>
                                Já tem um login?
                            </Text>
                        </Pressable>
                    </VStack>
                </VStack>
            </SafeAreaView>
        </ImageBackground>
    );
}