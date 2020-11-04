import React, {useState} from 'react'
import {View, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    TextInput, 
    Alert, 
    Button, 
    Keyboard} from 'react-native'
import Card from '../components/Card'
import Fonts from '../constants/fonts'
import * as firebase from 'firebase'
import Register1 from './Register1'
import Register2 from './Register2'


const Register = props => {
    const [page2, setPage2] = useState(false)

    const onChangePage = (value) => {
        setPage2(value)
        console.log('Registration Successful')
    }

    let content = <Register1 toLogin={props.toLogin} toMain={props.toMain} toNext={onChangePage}/>

    if (page2) {
        content = <Register2 toLogin={props.toLogin}/>
    }
    // let content = <Register2 />


    return(
        <View style={styles.screen}>
            {content}
        </View>
        
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Register