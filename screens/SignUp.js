import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import * as firebase from 'firebase'

const SignUp = props => {
    firebase.database().ref('/' + props.apt + '/' + props.aptNum).once('value')
    .then((snapshot) => {
        console.log(snapshot.val())
    })
    return(
        <View>
            <Text>Job Sign Up</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default SignUp