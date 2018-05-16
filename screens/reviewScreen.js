import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, Platform } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect }from 'react-redux'
import { MapView } from 'expo';


class ReviewScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Review Jobs',
        headerRight: <Button 
                        title="Settings" 
                        onPress={() => { navigation.navigate('settings') }}
                        backgroundColor="rgba(0,0,0,0)"
                        color='rgba(0,122,255,1)"' 
                    />,
        tabBarIcon: ({tintColor}) => {
            return <Icon color={tintColor}  name='favorite' size={30}/>
        }
    })
 
    renderLikedJobs() {
        console.log('thispropsliked jobs', this.props.likedJobs)
        return this.props.likedJobs.map((job) => {
            const { 
                url, company, 
                formattedRelativeTime, 
                longitude, latitude, 
                jobkey, jobtitle  } = job
            const initialRegion = {
                longitude,
                latitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            }
            return (
                <Card title={jobtitle} key={ jobkey }>
                    <View style={{height: 200}}>
                        <MapView
                            scrollEnabled={false}
                            style={{flex: 1}}
                            cacheEnabled={Platform.OS === 'android'}
                            initialRegion={initialRegion}
                        >
                        </MapView>
                    </View>
                    <View style={{ height: 200}}>
                        <View style ={styles.detailWrapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{formattedRelativeTime}</Text>
                        </View>
                        <Button
                            title="Apply Now!"
                            backgroundColor="#03A9F4"
                            onPress={() => Linking.openURL(url)}
                        /> 

                    </View>
                </Card>
            )
        })
    }
    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        )
    }
}

function mapStateToProps({likedJobs}) {
    return { likedJobs }
}

export default connect(mapStateToProps)(ReviewScreen)


const styles = StyleSheet.create({
    italics: {
        fontStyle: 'italic'
    },
    detailWrapper: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10
    },
});
  