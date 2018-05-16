import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
const SCREEN_WIDTH = Dimensions.get('window').width

export default class Slids extends Component {

    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return (
                <Button
                    title='Onwards!'
                    raised
                    buttonStyle={styles.buttonStyle}
                    onPress={this.props.onComplete}
                />
            )
        }
    }
    renderSlides() {
        return this.props.data.map((slide, i) => {
            return (
                <View 
                    style={[styles.slide, {backgroundColor: slide.color}]} 
                    key={slide.text}
                >
                    <Text style={styles.text}>{slide.text}</Text>
                    {this.renderLastSlide(i)}
                </View>
            )
        })
    }
    render() {
        return (
            <ScrollView
                pagingEnabled
                horizontal
                style={{flex: 1}}
            >
                {this.renderSlides()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        color: 'white'
    },
    buttonStyle: {
        backgroundColor: '#0288D1',
        marginTop: 15
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    }    
});
  