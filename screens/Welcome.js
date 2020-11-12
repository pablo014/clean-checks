import React from 'react'
import {View, StyleSheet, Text} from 'react-native'

const Welcome = props => {
    return(
            <View style={styles.titleContainer}>
            <Text>Welcome {props.name}</Text>
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