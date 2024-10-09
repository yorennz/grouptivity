import { View, StyleSheet, Text, FlatList} from 'react-native';
import {colors} from '../Constants/Colors'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Title, Card} from 'react-native-paper';
import NewsCard from '../Components/NewsCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Lobby'>

const HomeScreen = ({navigation, route}: Props): JSX.Element => {
    const news = require('../Data/News.json');
    
    return (
    <View style={style.screen}>
        <View style={style.firstSectionContainer}>
            <Title style={style.title}>
                Community
            </Title>
            <Text style={{fontSize: 17, fontWeight: '300', padding: 20, width: '100%'}}>
                At Grouptivity, we embrace the potential of collaboration, which begins with getting to know your fellow colleagues. Additionally, you can stay informed about the most recent company news and announcements right here.
            </Text>
        </View>
        <View style={style.secondSectionContainer}>
            <Title style={{fontWeight: '800', fontSize: 18}}>
                Company news
            </Title>
            <FlatList
                data={news}
                renderItem={NewsCard}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{width:'95%', height: 375, marginTop: 5, padding: 5, alignSelf: 'center'}}
            />
        </View>
    </View>
    );
}

const style = StyleSheet.create({
    screen: {
      alignItems: 'center',
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: colors[1],
    },
    title: {
        fontWeight: '900', 
        fontSize: 25, 
        marginLeft: 5
    },
    firstSectionContainer: {
        width: '100%',
        height: '20%',
        marginTop: '15%',
        borderRadius: 20,
    },
    secondSectionContainer: {
        width: '90%',
        borderRadius: 20,
        marginTop: 50,
        marginLeft: 10
    },
  });

export default HomeScreen;