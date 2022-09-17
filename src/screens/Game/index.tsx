import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, FlatList, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

import logoImg from "../../assets/logo-nlw-esports.png";
import { SafeAreaView } from "react-native-safe-area-context";

import { GameParams } from "../../@types/navigation";
import { Background } from "../../components/background";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../../components/Heading/HeadingIndex";
import { DuoCard } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";


export interface DuoProps {
  id: string;
  hourEnd: string,
  hourStart: string,
  name: string,
  useVoiceChanel: boolean;
  weekDays: string[],
  yearsPlaying: number;
}

export const Game = () => {
  const [duos, setDuos] = useState<DuoProps[]>([])
  const navigation = useNavigation()
  const router = useRoute();
  const game = router.params as GameParams;
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')
  const handleGoBack = () => {
   navigation.goBack()
  }
  
 async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.0.104:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => setDiscordDuoSelected(data.discord));
 }

  useEffect(() => {
    fetch(`http://192.168.0.104:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image resizeMode="cover" source={{ uri: game.bannerUrl }} style={styles.cover} />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />
        <FlatList 
         data={duos}
         keyExtractor={item => item.id}
         renderItem={({ item }) => (
          <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
         )}
         horizontal
         contentContainerStyle={styles.contentList}
         contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent ]}
         ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Não anúncios publicados ainda.
          </Text>
         )}
        />

        <DuoMatch visible={discordDuoSelected.length > 0} discord={discordDuoSelected} onClose={() => setDiscordDuoSelected('')}          
        />

      </SafeAreaView>
    </Background>
  );
};
