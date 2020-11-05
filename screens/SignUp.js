import React from 'react'
import {View, StyleSheet} from 'react-native'
import * as firebase from 'firebase'

const SignUp = props => {
    firebase.database().ref('/' + props.apt + '/' + props.aptNum).once('value')
    .then((snapshot) => {
        console.log(snapshot.val())
    })
    return(
        <View>

        </View>
    )
}

const styles = StyleSheet.create({

})

export default SignUp