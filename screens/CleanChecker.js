import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import * as firebase from 'firebase'

const CleanChecker = props => {
    let numResidents;
    let responsibilities;

    firebase.database().ref(props.apt + 'Rooms/' + props.aptNum).on('value', function(snapshot){
        numResidents = snapshot.numResidents
        responsibilities = require('../json/clean-chec-jobs-export.json')
        console.log(responsibilities)
    })

    return(
        <View>
            <Text>Clean Checks Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default CleanChecker