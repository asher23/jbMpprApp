import Expo, {Notifications} from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import AuthScreen from './screens/authScreen';
import WelcomeScreen from './screens/welcomeScreen';
import MapScreen from './screens/mapScreen';
import DeckScreen from './screens/deckScreen';
import ReviewScreen from './screens/reviewScreen';
import SettingsScreen from './screens/settingsScreen';
import { Provider } from 'react-redux';
import store from './store';
import registerForNotifications from './services/pushNotifications';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener(notification => {
      const { data: { text }, origin} = notification
      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{text: 'Ok'}]
        )
      }
    })
  } 

  render() {
    const MainNavigator = TabNavigator({
      welcome: {screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen},
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: {screen: ReviewScreen},
              settings: { screen: SettingsScreen }
            })
          }
        }, {
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: { fontSize: 12}
          }
        })
      }
    }, {
      lazy: true,
      navigationOptions: ({navigation}) => ({
        tabBarVisible: false 
      })
    })
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
