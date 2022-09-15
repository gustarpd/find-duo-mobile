import React from "react";
import { StatusBar } from "react-native";
import { GameCard } from "./src/components/gameCard";

import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";

import { Home } from "./src/screens/Home";
import { Loading } from "./src/components/Loading/Loading";
import { Background } from "./src/components/background";

export default function App() {
  const [fontsLoade] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });
  return (
    <Background>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
      {fontsLoade ? <Home /> : <Loading />}
    </Background>
  );
}
