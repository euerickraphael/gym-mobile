import { useCallback, useState } from "react";
import { ImageBackground, Dimensions, SafeAreaView } from "react-native";
import { Text, VStack, Modal } from 'native-base'
import HoldingHalter from "../assets/HoldingHalter.png"
import { Button } from "../components/Button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function InitScreen() {

    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;

    const [showModal, setShowModal] = useState(false);

    const {navigate} = useNavigation();

    useFocusEffect(useCallback(() => {
        setShowModal(false);
    }, []))

    return (
        <SafeAreaView>
            <ImageBackground
                source={HoldingHalter}
                style={{
                    width: width,
                    height: height,
                }}
            >
                <VStack
                    flex={1}
                    alignItems="center"
                    justifyContent="space-between"
                    p={8}
                    w={width}
                    h={height}
                >
                    <Text color="#969696" fontSize="3xl">
                        Bora fazer o{"\n"}shape?
                    </Text>
                    <VStack mb="24" justifyContent="space-between">
                        <Button
                            title="Cadastre-se"
                            onPress={() => {
                                setShowModal(true);
                            }}
                            type="primary"
                        />
                        {showModal && (
                            <VStack>
                                <Button
                                    title="Cliente"
                                    onPress={() => navigate("cadastro")}
                                />
                                <Button
                                    title="Personal"
                                    onPress={() => navigate("cadastro")}
                                />
                            </VStack>
                        )}
                        <Button title="Login" type="primary" onPress={() => navigate("auth")}/>
                    </VStack>
                </VStack>
            </ImageBackground>
        </SafeAreaView>
    );
}
