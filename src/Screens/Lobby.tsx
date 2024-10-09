import { View, StyleSheet} from 'react-native';
import { useState } from 'react';
import {colors} from '../Constants/Colors'
import { BottomNavigation, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import ProfileScreen from './Profile';
import HomeScreen from './Home';
import OrganizationScreen from './Organization';
import WidgetsScreen from './Widgets';
import ChatScreen from './Chat';
import MapScreen from './Map';

type Props = NativeStackScreenProps<RootStackParamList, 'Lobby'>


const LobbyScreen = ({route, navigation}: Props): JSX.Element => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'home', title: 'Home', focusedIcon: 'home' },
      { key: 'organization', title: 'Organization', focusedIcon: 'account-group', unfocusedIcon: 'account-group-outline' },
      { key: 'widgets', title: 'Widgets', focusedIcon: 'widgets', unfocusedIcon: 'widgets-outline' },
      { key: 'map', title: 'Map', focusedIcon: 'map', unfocusedIcon: 'map-outline'},
      { key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline'},
    ]);

    const renderScene = BottomNavigation.SceneMap({
      home: () => <HomeScreen navigation={navigation} route={route}/>,
      organization: () => <OrganizationScreen navigation={navigation} route={route}/>,
      widgets: () => <WidgetsScreen navigation={navigation} route={route}/>,
      map: () => <MapScreen navigation={navigation} route={route}/>,
      profile: () => <ProfileScreen navigation={navigation} route={route}/>,
    });

    return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
    );
}

const Homestyles = StyleSheet.create({
  screen: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: colors[1],
  },
});

export default LobbyScreen;
