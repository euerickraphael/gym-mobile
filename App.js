import { NativeBaseProvider, StatusBar } from 'native-base'
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes/app.routes';

export default function App() {
  return (
    <NavigationContainer >
      <NativeBaseProvider>
        <Routes/>
        <StatusBar/>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
