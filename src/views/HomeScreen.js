import { useNavigation } from "@react-navigation/native";
import {
    FlatList,
    HStack,
    Pressable,
    ScrollView,
    Text,
    useTheme,
    VStack,
} from "native-base";
import { Dimensions, SafeAreaView } from "react-native";
import { CardTreino } from "../components/CardTreino";

export function HomeScreen(props) {
    const width = Dimensions.get("screen").width;
    const {navigate} = useNavigation();

    const { colors } = useTheme();

    const A = [
        {
            nome: "PEITO",
            desc: ["Supino Inclinado", "Supino Reto", "Cross Over", "Flexões"],
        },
        {
            nome: "TRÍCEPS",
            desc: ["Supino Fechado", "Tríceps Corda", "Tríceps Testa"],
        },
        {
            nome: "OMBRO",
            desc: [
                "Elevação Lateral",
                "Desenvolvimento Militar",
                "Cross Invertido",
            ],
        },
    ];

    const B = [
        {
            nome: "COSTAS",
            desc: [
                "Barra Fixa",
                "Puxada na Maquina",
                "Remada Curvada",
                "Serrote",
            ],
        },
        { nome: "BÍCEPS", desc: ["Rosca Scott", "Rosca Alternada", "Martelo"] },
    ];

    const C = [
        {
            nome: "QUADRÍCEPS",
            desc: ["Agachamento Livre", "Búlgaro", "Leg Press"],
        },
        {
            nome: "PANTURRILHAS",
            desc: ["Panturrilha Sentado", "Panturrilhas em pé"],
        },
        { nome: "GLÚTEOS", desc: ["Elevação Pélvica"] },
        { nome: "POSTERIORES", desc: ["Stiff", "Mesa Flexora"] },
    ];

    return (
        <SafeAreaView
            style={{
                width: width,
                backgroundColor: colors.gray[900],
            }}
        >
            <ScrollView pl={5}>
                <HStack justifyContent="space-between" alignItems="center" pr={5}>
                    <Text
                        color="white"
                        fontWeight="bold"
                        fontSize="2xl"
                    >
                        Seus treinos
                    </Text>
                    <Pressable onPress={() => navigate("perfil", {email: props.route.params.email})}>
                        <Text
                            color="white"
                            textAlign="center"
                            fontWeight="bold"
                        >
                            VER PERFIL > 
                        </Text>
                    </Pressable>
                </HStack>
                <VStack my={5}>
                    <Text color="white" fontSize="3xl">
                        A
                    </Text>
                    <FlatList
                        data={A}
                        renderItem={({ item, index }) => (
                            <CardTreino
                                Treino={item.nome}
                                Descricao={item.desc}
                                key={index}
                            />
                        )}
                        horizontal
                    />
                </VStack>
                <VStack my={5}>
                    <Text color="white" fontSize="3xl">
                        B
                    </Text>
                    <FlatList
                        data={B}
                        renderItem={({ item, index }) => (
                            <CardTreino
                                Treino={item.nome}
                                Descricao={item.desc}
                                key={index}
                            />
                        )}
                        horizontal
                    />
                </VStack>
                <VStack my={5}>
                    <Text color="white" fontSize="3xl">
                        C
                    </Text>
                    <FlatList
                        data={C}
                        renderItem={({ item, index }) => (
                            <CardTreino
                                Treino={item.nome}
                                Descricao={item.desc}
                                key={index}
                            />
                        )}
                        horizontal
                    />
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
