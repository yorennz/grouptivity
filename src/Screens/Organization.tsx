import { View, StyleSheet, ScrollView} from 'react-native';
import {colors} from '../Constants/Colors'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import UserListComponent from '../Components/UserListComponent';

type Props = NativeStackScreenProps<RootStackParamList, 'Lobby'>

const OrganizationScreen = ({navigation, route}: Props): JSX.Element => {

    return (
    <View style={style.screen}>
        <UserListComponent navigation={navigation} route={route}/>
    </View>
    );
}

const style = StyleSheet.create({
    screen: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: colors[1],
    },
});

export default OrganizationScreen;