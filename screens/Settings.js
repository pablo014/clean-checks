import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import * as firebase from 'firebase'

const Settings = props => {
    firebase.database().ref('/' + props.apt + '/' + props.aptNum).once('value')
    .then((snapshot) => {
        console.log(snapshot.val())
    })
    return(
        <View>
            <Text>Settings</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default Settings