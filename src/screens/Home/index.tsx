import React, { useEffect, useState } from "react";
import { ImageBackground, View, FlatList } from "react-native";
import { styles } from "./styles";
import { GameCard, GameCardProps } from "../../components/gameCard";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading/HeadingIndex";

import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/background";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate("game", { id, title, bannerUrl });
  }

  useEffect(() => {
    fetch("http://192.168.0.104:3333/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={logoImg} style={styles.container.logo} />

        <Heading
          title="Encontre o seu duo"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard onPress={() => handleOpenGame(item)} data={item} />
          )}
          horizontal
        />
      </SafeAreaView>
    </Background>
  );
}
