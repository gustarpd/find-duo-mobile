import React from "react";
import { ImageBackground, View, FlatList } from "react-native";
import { styles } from "./styles";
import { GameCard } from "../../components/gameCard";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading/HeadingIndex";
import { GAMES } from "../../utils/games";

export function Home() {
  return (
    <View style={styles.container}>
      <ImageBackground source={logoImg} style={styles.container.logo} />

      <Heading
        title="Encontre o seu duo"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        data={GAMES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        horizontal
      />
    </View>
  );
}
