import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "../views/AuthScreen";
import { CadastroScreen } from "../views/CadastroScreen";
import { HomeScreen } from "../views/HomeScreen";
import InitScreen from "../views/InitScreen";
import { PrefilScreen } from "../views/PerfilScreen";

export function Routes() {
    const { Navigator, Screen } = createNativeStackNavigator();
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen name="initscreen" component={InitScreen} />
            <Screen name="cadastro" component={CadastroScreen} />
            <Screen name="auth" component={AuthScreen} />
            <Screen name="home" component={HomeScreen} />
            <Screen name="perfil" component={PrefilScreen} />
        </Navigator>
    );
}
