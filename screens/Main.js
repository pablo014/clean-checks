import React, { useState } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import * as firebase from 'firebase'

const Main = props => {
    const [name, setName] = useState('')
    const [apt, setApt] = useState('')
    const [aptNum, setAptNum] = useState('')
    const [job, setJob] = useState('')
    const [isCleanChecker, setIsCleanChecker] = useState(false)
    const [pass, setPass] = useState(true)
    var userId = firebase.auth().currentUser.uid
    var reference = firebase.database().ref('/users/' + userId)
    reference.once('value').then(function(snapshot) {
        setName(snapshot.val().name)
        setApt(snapshot.val().apt)
        setAptNum(snapshot.val().aptNum)
        setJob(snapshot.val().job)
        setIsCleanChecker(snapshot.val().isCleanChecker)
        setPass(snapshot.val().pass)
    })
    return (
        <View>
            <Text>Welcome {name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default Main