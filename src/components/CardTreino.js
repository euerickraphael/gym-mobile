import { Text, VStack } from "native-base";

export function CardTreino({Treino, Descricao}){
    return (
        <VStack bgColor="gray.600" mx={5} p={5} rounded="md">
            <Text color="white" >{Treino}</Text>
            <VStack my={3} pl={3}>
                {Descricao.map((item, index) => (
                    <Text color="white" my={1}>
                        {index+1}-{item}
                    </Text>
                ))}
            </VStack>
        </VStack>
    );
}