import React, {Component} from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import Slides from '../components/slides'
import _ from 'lodash';
import { AppLoading } from 'expo';

const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: '#03A9F4'},
    { text: 'Use this to get your job', color: '#009688'},
    { text: 'Set your location, then swipe away', color: '#03A9F4'}
]
export default class WelcomeScreen extends Component {
    state = { token: null }

    async componentWillMount() {
        // AsyncStorage.removeItem('fb_token')
        let token = await AsyncStorage.getItem('fb_token');
        if (token) {
            this.props.navigation.navigate('map');
            this.setState({token})
        } else {
            this.setState({token: false})
        }
    }
    onSlidesComplete = () => {
        this.props.navigation.navigate('auth')
    }
    render() {
        if (_.isNull(this.state.token)) {
            return (
                <Text>
                    still loading
                </Text>
            )
        }
        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete}/>
        )
    }
}

const styles = StyleSheet.create({
    container2: {
      flex: 1
    },
});
  