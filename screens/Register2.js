import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, CheckBox} from 'react-native'
import Card from '../components/Card'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import * as firebase from 'firebase'
import FormStyles from '../constants/basicFormItems'
import Fonts from '../constants/fonts'

const Register2 = props => {
    const [apt, setApt] = useState('universityView')
    const [aptNum, setAptNum] = useState('')
    const [fName,setFName] = useState('')
    const [lName, setLName] = useState('')
    const [isCleanChecker, setIsCleanChecker] = useState(false)

    var database = firebase.database()
    var storeData = {
        "apt": "",
        "aptNum": "",
        "name": "",
        "isCleanChecker": false,
        "job": "",
        "uid": "",
        "pass": true,
    }
    var radio_props = [
        {label: 'University View', value: 'universityView'},
        {label: 'Centre Square', value: 'centreSquare'},
        {label: 'Nauvoo', value: 'nauvoo'},
        {label: 'The Cove', value: 'theCove'},
        {label: 'Kensington', value: 'kensington'},
        {label: 'La Jolla', value: 'laJolla'},
        {label: 'The Towers', value: 'towers'},
    ]

    const onFinishRegistration = () => {
        storeData.name = fName + " " + lName
        storeData.apt = apt
        storeData.aptNum = aptNum
        storeData.isCleanChecker = isCleanChecker
        storeData.uid = firebase.auth().currentUser.uid
        database.ref('/' + apt + '/' + aptNum).update(storeData)
        database.ref('/users/' + storeData.uid).update(storeData)
        // if(firebase.auth().currentUser) {
        //     firebase.auth().signOut()
        // }
        props.toLogin(false)
    } 

    const onChangeApt = apt => {
        setApt(apt)
    }

    const onChangeAptNum = aptNum => {
        setAptNum(aptNum)
    }

    const onChangeFirstName = name => {
        setFName(name)
    }

    const onChangeLastName = name => {
        setLName(name)
    }

    return(
        <TouchableWithoutFeedback>
    <View style={styles.screen}>
        <Text style={Fonts.title}>Registration</Text>
        <Card style={FormStyles.inputContainer}>
            <View>
                <View>
                    <TextInput title="First Name" 
                    placeholder="First Name"
                    onChangeText={(value) => {onChangeFirstName(value)}}
                    style={FormStyles.input}/>
                    <TextInput title="Last Name" 
                    placeholder="Last Name"
                    onChangeText={(value) => {onChangeLastName(value)}}
                    style={FormStyles.input}/>
                </View>
            <View>
            <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {onChangeApt(value)}}
        />
            </View>    
            <View>
            <TextInput 
                placeholder="Room Number"
                onChangeText={(value)=>{onChangeAptNum(value)}}
                style={FormStyles.input}
                />
            </View>
            </View>
            <View>
            <Text style={FormStyles.checkboxLabel}>Are You A Clean Checker?</Text>
            <RadioForm 
            radio_props={[{label: "Yes", value: true}, {label: "No", value: false}]}
            initial={0}
            onPress={(value) => {setIsCleanChecker(value)}}
            />
            </View>
            <View style={FormStyles.buttonContainer}>
            <Button 
            title="Finish Registration" 
            onPress={onFinishRegistration}
            style={FormStyles.button}
            />
            </View>
        </Card>
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
})

export default Register2