import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, FlatList, View, TouchableOpacity, TextInput } from 'react-native';
import { XGroupAuthorization } from '../Constants/APIToken';
import { handleError } from '../utils';
import { colors } from '../Constants/Colors';
import { Avatar, Card, Searchbar} from 'react-native-paper';

interface HomeScreenProps {
    navigation: any;
    route: {
      params: {
        apiToken: string;
      };
    };
  }

type ItemData = {
  id: number,
  email: string,
  name: string,
  surname: string
}

const UserListComponent = ({navigation, route}: HomeScreenProps): JSX.Element => {
    const [userList, setUserList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [filteredList, setFilteredList] = useState([]);

    const loadUserList = (json: JSON) => {
      const strJson = JSON.stringify(json)
      const obj = JSON.parse(strJson);
      setUserList(obj)
      setFilteredList(obj)
    }

    const renderItem = ({ item }: {item: ItemData}) => {
      return(
      <Card
          style={style.itemContainer}
          onPress={() => {navigation.navigate('UserDetails', {apiToken: route.params.apiToken, userId: item.id})}}
      >
        <Card.Content style={{alignItems: 'center'}}>
          <Avatar.Image size={100} source={{uri: "https://masurao.fr/api/employees/" + item.id + "/image"}} />
          <Text style={style.name}>
            {item.name} {item.surname}
          </Text>
          <Text style={style.email}>
            {item.email}
          </Text>
        </Card.Content>
      </Card>
      )};
    
    useEffect(() => {
      fetch("https://masurao.fr/api/employees", {
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
          response.json().then((json) => {loadUserList(json)})
        }
        else{
          response.json().then((json) => {handleError(response.status, json)})
        }
      })        
      .catch((error) => {
        console.error(error);
      })
    }, [])

    const filterUserList = (userList: any, filter: string) => {
      if (filter === '') {
        return userList;
      }
      return userList.filter((user: any) => {
        const userName = user.name.toLowerCase();
        const filterLowerCase = filter.toLowerCase();
        return userName.includes(filterLowerCase);
      });
    };

    return (
      <View style={style.list}>
        <Searchbar
            style={style.SearchBar}
            placeholder="Search"
            value={searchValue}
            onChangeText={(text) => {setSearchValue(text)
            const filteredData = filterUserList(userList, text);
            setFilteredList(filteredData);
        }}/>
        <FlatList 
            renderItem={renderItem}
            data={filteredList}
            keyExtractor={(item) => item.id.toString()}
            style={style.userList}
            numColumns={2}
        />
      </View>
    )
}

const style = StyleSheet.create({
  list: {
    top: '1.%',
    height: '96%',
    width: '100%',
    alignItems: 'center'
  },
  userList: {
    margin: 0,
    width: '100%',
  },
  image: {
    backgroundColor: '#000',
    resizeMode: 'cover',
    width: '100%',
    height: 140,
    borderRadius: 10,
  },
  name: {
    color: colors[5],
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
  email: {
    marginTop: 5,
    color: colors[5],
    textAlign: 'center',
    fontSize: 8,
    fontWeight: 'bold'
  },
  itemContainer: {
    margin: 20,
    height: 180,
    flex: 1,
    backgroundColor: colors[0],
    borderStyle: 'solid',
    borderRadius: 10,
  },
  SearchBar: {
    width: '80%',
    marginTop: '7%',
  },
})

export default UserListComponent;