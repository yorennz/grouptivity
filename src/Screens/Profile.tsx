import { View, Image, Text, StyleSheet, Touchable, TouchableOpacity} from 'react-native';
import {colors} from '../Constants/Colors'
import { XGroupAuthorization } from '../Constants/APIToken';
import { handleError } from '../utils';
import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Button, Divider, Title, Avatar } from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'Lobby'>

type Employee = {
    id: number,
    email: string,
    name: string,
    surname: string,
    birth_date: string,
    gender: string,
    work: string,
    subordinates: [
      number
    ]
}

const ProfileScreen = ({navigation, route}: Props): JSX.Element => {
  const [userInfo, setUserInfo] = useState<Employee>();
    useEffect(() => {
      fetch("https://masurao.fr/api/employees/me", {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "X-Group-Authorization": XGroupAuthorization,
            Authorization : "Bearer " + route.params.apiToken
          },
        })
        .then((response) => {
          if (response.status == 200) {
              response.json().then((json) => {
                  const strJson = JSON.stringify(json)
                  const obj = JSON.parse(strJson);
                  setUserInfo(obj);
              })
          }
          else{
            response.json().then((json) => {handleError(response.status, json)})
          }
        })        
        .catch((error) => {
          console.error(error);
    })}, [])

    return (
      <View>
      <View style={Style.DetailsContainer}>
        <Avatar.Image
        size={200}
        source={{uri: "https://masurao.fr/api/employees/" + userInfo?.id + "/image"}}/>
        <Title style={Style.Name}>{userInfo?.name} {userInfo?.surname}</Title>
        <View style={Style.InfoSection}>
          <Text style={Style.Label}>Work: </Text>
          <Text style={Style.InfoData}>{userInfo?.work}</Text>
        </View>
        <View style={Style.InfoSection}>
          <Text style={Style.Label}>Email Adress:</Text>
          <Text style={Style.InfoData}>{userInfo?.email}</Text>
        </View>
        <View style={Style.InfoSection}>
          <Text style={Style.Label}>Birthdate:</Text>
          <Text style={Style.InfoData}>{userInfo?.birth_date}</Text>
        </View>
        <View style={Style.InfoSection}>
          <Text style={Style.Label}>Gender:</Text>
          <Text style={Style.InfoData}>{userInfo?.gender}</Text>
        </View>
      </View>
      <View style={Style.OptionContainer}>
        <Divider style={{width: '80%'}}/>
        <Button icon="logout" onPress={() => {navigation.navigate("Login")}} textColor='red' style={{marginTop: 10}}>
          Logout
        </Button>
      </View>
    </View>
    );
}

const Style = StyleSheet.create({
  CloseButton: {
    position: 'absolute',
    marginTop: 40,
    zIndex: 1,
  },
  Name: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 20,
  },
  DetailsContainer: {
    marginTop: '20%',
    alignItems: 'center',
  },
  OptionContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  InfoSection :{
    width: '70%',
  },
  Label: {
    fontSize: 15,
    marginTop: 20,
    fontWeight: '300',
    color: '#328777'
  },
  InfoData: {
    marginTop: 5,
    marginLeft: 10,
  }
});

export default ProfileScreen;
