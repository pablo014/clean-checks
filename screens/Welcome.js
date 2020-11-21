import React from 'react'
import {View, StyleSheet, Text} from 'react-native'

const Welcome = props => {

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
    
    return(
            <View style={styles.titleContainer}>
            <Text>Welcome {props.name}</Text>
            <Text>Your Job is Job {props.job}</Text>
            <Text>Clean Check Status: {status}</Text>
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
})

export default Welcome