import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import {colors} from '../Constants/Colors'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useEffect, useState } from 'react';
import { Button, IconButton } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import ClockScreen from '../Components/Widgets/ClockScreen';
import Meteo from '../Components/Widgets/Meteo';
import TodoList from '../Components/Widgets/TodoList';
import Calendar from '../Components/Widgets/Calendar';
import Calculator from '../Components/Widgets/Calculator';

import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Lobby'>

const WidgetsScreen = ({navigation, route}: Props): JSX.Element => {
    const [fetch, setFetch] = useState(false);
    const [open, setOpen] = useState(false);
    const widgetList = [
      {
        name: 'clock',
        component: ClockScreen
      },
      {
        name: 'meteo',
        component: Meteo
      },
      {
        name: 'todo list',
        component: TodoList
      },
      {
        name: 'calendar',
        component: Calendar
      },
      {
        name: 'calculator',
        component: Calculator
      }
    ]
    const [widgetModified, setWidgetModified] = useState<Number>(-1);
    const [userWidgets, setUserWidgets] = useState<{name: string}[]>([]);

    const addWidget = async (widgetName: string) => {
      const updatedWidgets = [
        ...userWidgets,
        {
          name: widgetName
        }
      ];
      setUserWidgets(updatedWidgets);
      await AsyncStorage.setItem('userWidgets', JSON.stringify(updatedWidgets));
      setOpen(false);
    }

    const deleteWidget = async (index: Number) => {
      const updatedWidgets = userWidgets.filter((_, i) => i !== index);

      await AsyncStorage.setItem('userWidgets', JSON.stringify(updatedWidgets));
      setUserWidgets(updatedWidgets);
      setWidgetModified(-1);
    }

    const fetchWidgets = async () => {
      const userWidgetsString = await AsyncStorage.getItem('userWidgets');

      if (userWidgetsString !== null) {
        setUserWidgets(JSON.parse(userWidgetsString));
      }
    }

    useEffect(() => {
      fetchWidgets();
    }, [])

    return (
    <View style={Homestyles.screen}>
      {!open ? (
      <>
      <View style={{height: '93%', width: '100%', alignItems: 'center', paddingTop: 70}}>
        <ScrollView showsVerticalScrollIndicator={false} style={Homestyles.widgetList}>
          {userWidgets.length ? userWidgets.map((widget, index) => {
            const widgetInfo = widgetList.find(widgetElem => widget?.name === widgetElem.name);
            if (widgetInfo) {
              const WidgetComponent = widgetInfo.component;
              return (
                <View key={index} style={Homestyles.widgetContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          if (widgetModified !== -1) {
                            setWidgetModified(-1);
                          }
                        }}
                        onLongPress={() => setWidgetModified(index)}
                        >
                          <WidgetComponent/>
                      </TouchableOpacity>
                      {widgetModified == index ? (
                        <IconButton
                          style={{position: 'absolute', display: 'flex', top: 0, right: 0 }}
                          color='red'
                          icon={props => <Icon name='delete' {...props} />}
                          onPress={() => deleteWidget(index)}
                        />
                      ) : <View style={{ position: 'absolute' }} />}
                  </View>
              );
            }
            return null;
          }) : null}
          </ScrollView>
          {!userWidgets.length ? (
            <View style={{alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%'}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>{"There's nothing here for now..."}</Text>
            </View>
          ) : null}
        </View>
        <View style={Homestyles.footer}>
            <Button
              title="Add"
              color={colors[3]}
              onPress={() => setOpen(true)}
            />
        </View></>) : (
      <Modal
        animationType='slide'
        presentationStyle='pageSheet'
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
          <View style={Homestyles.modalScreen}>
            <View style={Homestyles.header}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>Add</Text>
              <View style={{position: 'absolute', display: 'flex', paddingRight: 10, justifyContent: 'center', alignItems: 'flex-end', width: '100%'}}>
                <IconButton
                  icon={props => <Icon name='close' {...props} />}
                  onPress={() => setOpen(false)}
                />
              </View>
            </View>
            <View style={Homestyles.widgetList}>
              <ScrollView>
                {widgetList.map((widget, index) => {
                  return (
                    <View key={index} style={[Homestyles.widgetContainer, {marginBottom: 20}]}>
                        <Text style={{textTransform: 'capitalize', fontWeight: 'bold', fontSize: 18, paddingHorizontal: 20}}>{widget.name}</Text>
                        <TouchableOpacity
                          onPress={() => addWidget(widget.name)}
                        >
                            <widget.component />
                        </TouchableOpacity>
                      </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
      </Modal>)}
    </View>
    );
}

const Homestyles = StyleSheet.create({
    screen: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: colors[1],
    },
    modalScreen: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      paddingBottom: 100,
      backgroundColor: colors[1],
    },
    header: {
      flexDirection: 'row',
      display: 'flex',
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    footer: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      // height: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: 10,
    },
    widgetList: {
      display: 'flex',
      width: '80%',
    },
    widgetContainer: {
      gap: 20,
    }
  });

export default WidgetsScreen;