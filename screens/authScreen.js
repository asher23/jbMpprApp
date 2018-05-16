import React, {Component} from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import * as actions from '../actions';

class AuthScreen extends Component {
    componentDidMount() {
        this.props.facebookLogin();  
        this.onAuthComplete(this.props) 
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }
    
    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('map');
        }
    }
    render() {
        return (
            <View style={styles.container3}>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container3: {
      flex: 1
    },
});

function mapStateToProps({auth}) {
    return { token: auth.token }
}
  

export default connect(null, actions)(AuthScreen);