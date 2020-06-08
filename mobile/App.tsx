import React from 'react';
import {StatusBar, View, Text} from 'react-native';
// import {AppLoading} from 'expo';
import { Roboto_400Regular, Roboto_500Medium} from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts} from '@expo-google-fonts/ubuntu';//useFonts-> Importar de qualquer uma das fontes importadas
import Routes from './src/routes';

function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if(!fontsLoaded){
    console.log(fontsLoaded)
    return <View><Text>Carregando</Text></View>
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
      <Routes />
    </>
  );
}

export default App;