import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, 
    TouchableWithoutFeedback, Keyboard, Button, 
    Alert} from 'react-native'
import Card from '../components/Card'
import Fonts from '../constants/fonts'
import * as firebase from "firebase"

const Login = props => {

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [isLogin, setIsLogin] = useState(false)
    const resetInputHandler = () => {
        setUser('')
        setPass('')
    } 
    const onLoginHandler = () => {
        //make the inputs required
        Keyboard.dismiss()
        if(user == '') {
            Alert.alert('Missing Username', 'No username inputted', [{text: 'okay', style: 'destructive'}])
            return;
        }
        if(pass == '') {
            Alert.alert('Missing Password', 'No password inputted', [{text: 'okay', style: 'destructive'}])
            return;
        }
        
        firebase.auth().signInWithEmailAndPassword(user, pass).catch(function (error){
            var errorCode = error.code
            var errorMessage = error.message
            if (errorCode === 'auth/wrong-password') {
                Alert.alert('Incorrect Password', 'You have inputted the wrong password', [{text:'okay', style:'destructive', onPress:resetInputHandler}]);
              } else {
                Alert.alert(errorCode, errorMessage, [{text:'okay', style:'destructive', onPress:resetInputHandler}]);
              }
        })
        var loginUser = firebase.auth().currentUser
        if(loginUser) {
            props.isLoggedIn(true)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss()
        }}>
            <View style={styles.screen}>
                <Text style={Fonts.title}>Login</Text>
                <Card style={styles.inputContainer}>
                    <TextInput 
                    placeholder="Email"
                    style={styles.input}
                    value={user}
                    onChangeText={user => setUser(user)} />
                    <TextInput 
                    placeholder="Password"
                    style={styles.input}
                    value = {pass}
                    onChangeText = {pass => setPass(pass)}
                    secureTextEntry={true}
                    />
                    <Button title='Login' onPress={onLoginHandler}/>
                </Card>
                <View>
                    <Text style={Fonts.hyperlink} onPress={()=>props.register(true)}>Don't have an account? Click Here!</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer:{
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
        width: '85%',
        padding: 10
    }
})

export default Login