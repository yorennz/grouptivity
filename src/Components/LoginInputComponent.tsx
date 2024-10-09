import React, {useState} from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { XGroupAuthorization } from '../Constants/APIToken';
import { colors } from '../Constants/Colors';
import { handleError } from '../utils';
import { TextInput, Button } from 'react-native-paper';


const LoginInputComponent = ({navigation}: any): JSX.Element => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const LoginUser = (json : JSON) =>{
      const obj = JSON.parse(JSON.stringify(json));
      const token = obj.access_token;
      navigation.push('Lobby', {apiToken: token});
    }

    const requestLogin = () => {
      fetch("https://masurao.fr/api/employees/login", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "X-Group-Authorization": XGroupAuthorization
        },
      body: JSON.stringify(
        {
          "email": email,
          "password": password
        }),
      })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((json) => {LoginUser(json)})
        }
        else{
          response.json().then((json) => {handleError(response.status, json)})
        }
      })
      .catch((error) => {
        console.error(error);
      })

    }
    return (
        <View style={styles.container}>
          <Text style={styles.title}>
            <Text style={{fontSize: 90}}>G</Text>rouptivity
          </Text>
          <View style={styles.logins_container}>
          <TextInput style={styles.logins_input}
            label='Email'
            mode='outlined'
            onChangeText={setEmail}
            defaultValue={email}>
          </TextInput>
        </View>
        <View style={styles.logins_container}>
          <TextInput style={styles.logins_input}
            secureTextEntry={true}
            label='Password'
            mode='outlined'
            onChangeText={setPassword}
            defaultValue={password}>
          </TextInput>
        </View>
          <Button style={styles.login_button} onPress={requestLogin}>
            Login
          </Button>
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
      marginTop: 20,
      width: '100%',
      alignSelf: 'center',
    },
    login_button: {
      width: '30%',
      marginTop: 20,
      backgroundColor: colors[3],
    }
  });
  
  export default LoginInputComponent;