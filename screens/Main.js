import React, { useState } from 'react'
import {View, Text, StyleSheet, Settings} from 'react-native'
import * as firebase from 'firebase'
import NavBar, {NavButton, NavButtonText, NavTitle} from 'react-native-nav'
import Welcome from './Welcome.js'
import CleanChecker from './CleanChecker'
import SignUp from './SignUp.js'

const Main = props => {
    const [name, setName] = useState('')
    const [apt, setApt] = useState('')
    const [aptNum, setAptNum] = useState('')
    const [job, setJob] = useState('')
    const [isCleanChecker, setIsCleanChecker] = useState(false)
    const [pass, setPass] = useState(true)
    const [page, setPage] = useState('welcome')
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

    let content = <Welcome name={name}/>

    if(page == 'welcome') {
        content = <Welcome name={name}/>
    }
    else if(page == 'cleanChecker') {
        content = <CleanChecker/>
    }
    else if(page == 'signUp'){
        content = <SignUp apt={apt} aptNum={aptNum}/>
    }
    else if(page == 'settings') {
        content = <Settings />
    }
    let navigation
    if (isCleanChecker) {
    navigation = <NavBar >
        <View>
            <NavButton onPress={setPage('settings')}>
                <NavButtonText>{"Settings"}</NavButtonText>
            </NavButton>
        </View>
        <View>
            <NavButton onPress={setPage('welcome')}>
                <NavButtonText>{"Home"}</NavButtonText>
            </NavButton>
        </View>
        <View>
            <NavButton onPress={setPage('signUp')}>
                <NavButtonText>{"Job Sign Up"}</NavButtonText>
            </NavButton>
        </View>
        <View>
            <NavButton onPress={setPage('cleanChecker')}>
                <NavButtonText>{"Clean Check"}</NavButtonText>
            </NavButton>
        </View>
    </NavBar>
    }
    else {
        navigation = <NavBar >
        <View>
            <NavButton>
                <NavButtonText onPress={setPage('settings')}>{"Settings"}</NavButtonText>
            </NavButton>
        </View>
        <View>
            <NavButton>
                <NavButtonText onPress={setPage('welcome')}>{"Home"}</NavButtonText>
            </NavButton>
        </View>
        <View>
            <NavButton>
                <NavButtonText onPress={setPage('signUp')}>{"Job Sign Up"}</NavButtonText>
            </NavButton>
        </View>
    </NavBar>
    }

    return (
        <View style={styles.screen}>
            {content}
            <View style={styles.NavBarContainer}>
                {navigation}
            </View>
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

export default Main