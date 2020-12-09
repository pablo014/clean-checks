import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import Card from '../components/Card'

const Welcome = props => {

    let today = new Date();

    let status;

    switch (props.status) {
        case 0: 
            status = 'Fail';
            break;
        case 1:
            status = 'Pass';
            break;
        case 2: 
            status = 'Recheck';
            break;
        case 3: 
            status = 'Unchecked';
            break;
    }

    let scheduleString = '  Schedule: \n';

    props.schedule.forEach(schedule => {
        scheduleString += '\u2022' + schedule + '\n';
    });
    
    
    return(
            <View style={styles.titleContainer}>
                <Card style={styles.titleContainer}>
            <Text>Welcome {props.name}</Text>
            <Text>Your Job is Job {props.job}</Text>
            <Text>Clean Check Status: {status}</Text>
            <View style={styles.textContainer}>
                <Text>Comments:</Text>
                <Text>{props.comments != '' && props.status != 3 ? props.comments : "There are no comments to display"}</Text>
            </View>
            <View style={styles.textContainer}>
    <Text >{scheduleString}</Text>
            </View>
            </Card>
            </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        paddingVertical:20,
        justifyContent: 'flex-start',
        marginTop: 40,
        alignItems: 'center'
  },
    NavBarContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom:40,
        
    },
    screen: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    textContainer: {
        paddingVertical: 10
    }
})

export default Welcome