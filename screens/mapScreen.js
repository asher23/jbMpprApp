import React, {Component} from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions'
import { Button, Icon } from 'react-native-elements'
class MapScreen extends Component {
    static navigationOptions = {
        title: 'Map',
        tabBarIcon: ({tintColor}) => {
            return <Icon color={tintColor}  name='my-location' size={30}/>
        }
    }
    state = {
        mapLoaded: false,
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    }
    componentDidMount() {
        this.setState({mapLoaded: true})
    }

    onRegionChangeComplete = (region) => {
        this.setState({region})
    }
    onButtonPress = () => {
        this.props.fetchJobs(this.state.region, () => {
            this.props.navigation.navigate('deck');
        })
    }
    render() {
        if (!this.state.mapLoaded) {
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
        return (
            <View style={{flex: 1}}>
                <MapView 
                    region={this.state.region}
                    style={{flex: 1}}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                />
                <View style={styles.buttonContaienr}>
                    <Button
                        large
                        title="Search This Area"
                        backgroundColor="#009688"
                        icon={{name: 'search'}}
                        onPress={this.onButtonPress}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0
    },
});
  

export default connect(null, actions)(MapScreen)