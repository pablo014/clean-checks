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


const Register1 = props => {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [confirmValue, setConfirmValue] = useState('')
    const [confirm, setConfirm] = useState(false)
    

    const resetInputHandler = () => {
        setUser('')
        setPass('')
        setConfirmValue('')
        setConfirm(false)
    }

    const onChangeConfirmHandler = value => {
        setConfirmValue(value)
    }

    const onClickToLoginHandler = () => {
        props.toLogin(false)
    }

    const onClickRegister = () => {
        Keyboard.dismiss()
            if (user == '' || pass == '') {
                Alert.alert('Invalid Credentials', 'You must input a username and password', [{text:'Okay', style: 'destructive'}])
            }
            else if(pass != confirmValue) {
                setConfirm(false)
                Alert.alert('Different Passwords', 'You have inputted different passwords on the password text box', [{text:'okay', style:'destructive', onPress:resetInputHandler}])
            }
            else {
                setConfirm(true)
                firebase.auth().createUserWithEmailAndPassword(user, pass).catch(function(error){
                    var errorCode = error.code
                    var errorMessage = error.message
                    console.log(errorCode + ' ' + errorMessage)
                    Alert.alert(errorCode, errorMessage, [{text:'okay', style:'destructive', onPress:resetInputHandler}])
                })
                resetInputHandler()
                props.toNext(true)
            }
    }
    

    return (
    <TouchableWithoutFeedback>
        <View style={styles.screen}>
            <Text style={Fonts.title}>Register</Text>
            
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
                    <TextInput 
                    placeholder="Confirm Password"
                    style={styles.input}
                    value = {confirmValue}
                    onChangeText={onChangeConfirmHandler}
                    secureTextEntry={true}
                    />
                    
                    
                    <Button title='Register' onPress={onClickRegister}/>
                    
            </Card>
            <Text style={Fonts.hyperlink} onPress={onClickToLoginHandler}>Already have an account? Click Here!</Text>
            
        </View>
        
    </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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

export default Register1