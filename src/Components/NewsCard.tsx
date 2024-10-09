import { View, StyleSheet, Text, ScrollView, FlatList} from 'react-native';
import { Title, Card} from 'react-native-paper';
import {colors} from '../Constants/Colors'
import { News } from '../types';

const NewsCard = ({ item }: {item: News}): JSX.Element => {
    return (
        <Card style={style.newsCard}>
            <Card.Cover style={style.coverImage} source={{uri: item.imageUrl}}/>
            <Card.Content>
                <Title style={{fontWeight: '800', fontSize: 18}}>
                    {item.title}
                </Title>
                <ScrollView style={{height: 50, marginLeft: 5}}>
                    <Text>{item.body}</Text>
                </ScrollView>
            <Text style={{fontSize: 10, marginTop: 5}}>Published on {item.date}</Text>
            </Card.Content>
        </Card>
    );
}

export default NewsCard

const style = StyleSheet.create({
    newsCard: {
        width: 330,
        height: 360,
        borderRadius: 20,
        marginRight: 40,
        backgroundColor: colors[0]
    },
    coverImage: {
        width: '100%',
        height: '70%'
    },
})