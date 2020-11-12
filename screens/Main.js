import React, { useState } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import * as firebase from 'firebase'
import Welcome from './Welcome.js'
import CleanChecker from './CleanChecker'
import SignUp from './SignUp.js'
import Settings from './Settings.js'
import NavbarC from '../components/NavBarC'
import NavbarR from '../components/NavbarR'
import NavigationBar from 'react-native-navbar';
import Colors from '../constants/colors'

const Main = props => {
    const [name, setName] = useState('')
    const [apt, setApt] = useState('')
    const [aptNum, setAptNum] = useState('')
    const [job, setJob] = useState('')
    const [isCleanChecker, setIsCleanChecker] = useState(false)
    const [pass, setPass] = useState(true)
    const [page, setPage] = useState('Home')
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

    const movePage = (pageName) => {
        console.log(pageName)
        setPage(pageName)
    }

    const test = (value) => {
        console.log(value)
    }

    const logoutButtonConfig = {
        title: 'Logout',
        handler: ()=> {
            firebase.auth().signOut().then(() => {props.isLoggedIn(false)})
        }
    }

    let content = <Welcome name={name}/>

    if(page == 'Home') {
        content = <Welcome name={name}/>
    }
    else if(page == 'Clean Checks') {
        content = <CleanChecker apt={apt} aptNum={aptNum}/>
    }
    else if(page == 'Job Sign Up'){
        content = <SignUp apt={apt} aptNum={aptNum}/>
    }
    else if(page == 'Settings') {
        content = <Settings />
    }

    let navigation
    if (isCleanChecker) {
        navigation = <NavbarC page={movePage}/>
    }
    else {
        navigation = <NavbarR page={movePage} test={test}/>
    }

    return (
        <View style={styles.screen}>
            <NavigationBar 
            title={page}
            leftButton={logoutButtonConfig}
            />
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
        marginBottom:0,
    },
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
    },
})

export default Main