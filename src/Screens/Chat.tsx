import { View, Image, Text, StyleSheet, Touchable, TouchableOpacity} from 'react-native';
import {colors} from '../Constants/Colors'
import { XGroupAuthorization } from '../Constants/APIToken';
import { handleError } from '../utils';
import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { WebView } from 'react-native-webview';

type Props = NativeStackScreenProps<RootStackParamList, 'Lobby'>

const ChatScreen = ({navigation, route}: Props): JSX.Element => {
  return (
        <WebView style={style.screen} source={{uri: "https://discord.com/app"}}/>
    );
}

const style = StyleSheet.create({
  screen: {
    marginTop: '10%',
    width: '100%',
    height: '80%',
  },
});

export default ChatScreen;
