import axios from "axios";
import { useTheme, Text, VStack, HStack } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions, SafeAreaView } from "react-native";

export function PrefilScreen(props){
    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;

    const { colors } = useTheme();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        async function fetchData(){
            const response = await axios.get(
                `http://192.168.1.111:3000/users?email_like=${props.route.params.email}`
            );
            setUserName(response.data[0].name)
        }

        fetchData()
    }, []);

    return (
        <SafeAreaView
            style={{
                width: width,
                height: height,
                backgroundColor: colors.gray[900],
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <VStack py={5} bgColor={colors.gray[500]} roundedBottom={50} w={width}>
                <Text textAlign="center" color="white">
                    Seja bem-vindo, {userName}
                </Text>
            </VStack>
            <HStack bgColor={colors.gray[500]} w="56" rounded="md" alignItems="center" justifyContent="space-between" px={5}>
                <VStack w="2" h="2" bgColor={colors.gray[200]} rounded="full"></VStack>
                <Text color="white" textAlign="center" fontWeight="bold">
                    REDEFINIR SENHA
                </Text>
            </HStack>
            <VStack h="56" w={width} roundedTop={50} bgColor={colors.gray[500]}></VStack>
        </SafeAreaView>
    );
}