import React, { useState } from "react";
import {
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { CheckCircle } from "phosphor-react-native";
import { Heading } from "../Heading/HeadingIndex";
import * as Clipboard from "expo-clipboard";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordToClipBoard() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert("Discord copiado!", "Usuario copiado para o seu discord");
    setIsCopping(false);
  }

  return (
    <Modal animationType="fade" transparent {...rest} statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading
            title="Let's play!"
            subtitle="Agora é só comecar a jogar!"
            style={{ alignItems: "center", marginTop: 24 }}
          />

          <Text style={styles.label}>Adicione o seu Discord</Text>
          <TouchableOpacity
            onPress={handleCopyDiscordToClipBoard}
            disabled={isCopping}
            style={styles.discordButton}
          >
            <Text style={styles.discord}>
              {isCopping ? <ActivityIndicator /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
