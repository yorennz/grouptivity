import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { colors } from '../Constants/Colors';
import LoginInputComponent from '../Components/LoginInputComponent';

const LoginScreen = ({navigation}: any): JSX.Element => {
  return (
      <View style={{backgroundColor: colors[1], flex: 1}}>
        <LoginInputComponent
        navigation={navigation}    
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: { 
    display: 'flex',
    alignItems: 'center', 
    width: '100%',
    paddingTop: 200
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: colors[4]
  },
  logins_container: {
    width: '77%',
  },
  logins_input: {
    height: 40,
    marginTop: 20,
    paddingLeft: '5%',
    fontSize: 15,
    backgroundColor: colors[2],
    width: '100%',
    alignSelf: 'center',
    borderRadius: 13,
  },
  login_button: {
    width: '30%',
    height: 40,
    marginTop: 20,
    backgroundColor: colors[3],
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default LoginScreen;