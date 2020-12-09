import React, {useState} from 'react'
import {View, StyleSheet, Text, Button, TextInput, TouchableWithoutFeedback} from 'react-native'
import * as firebase from 'firebase'
import Fonts from '../constants/fonts'
import RadioForm from 'react-native-simple-radio-button'
import Card from '../components/Card'

const Room = props => {
    const [jobs, changeJobs] = useState([])
    const [shouldShow, changeShouldShow] = useState(false)
    const [showDetails, changeShowDetails] = useState(false)
    const [comments, changeComments] = useState('')
    let room = props.room
    const responsibilitiesJson = require('../json/clean-chec-jobs-export.json')
    const test = <Text>Hello, this is a test</Text>
    let submit = []
    let uids = []
    let users = []
    var radio_props = [
        {label: 'Pass', value: 1},
        {label: 'Recheck', value: 2},
        {label: 'Fail', value: 0},
    ]


    const makeRadioForm = (jobNum) => {
        let radioForm = <RadioForm
        radio_props={radio_props}
        initial={-1}
        onPress={(value) => {onPassOrFail(jobNum, value)}}
        formHorizontal = {true}
        labelHorizontal = {false}
        />
        return radioForm;
    }

    const jobList = jobs.map(jobDetails => <View>
        <Text>{jobDetails?.name}</Text>
        <Text style={Fonts.hyperlink}>{jobDetails != null && showDetails == false ? 'details' : null}</Text>
        {jobDetails != null && showDetails == false ? makeRadioForm(jobDetails.number) : null}
        </View>
        )
    if (shouldShow) {
    const saveRef = firebase.database().ref('/' + props.apt)
    saveRef.child(room).once('value').then( function(snapshot){
        submit = snapshot
        if (snapshot.val() != null && snapshot.numChildren() > 0) {
            snapshot.forEach(user => {
                uids.push(user.val().uid)
                users.push(user.val())
            })
        }
    })
    const ref = firebase.database().ref('/' + props.apt + 'Rooms/' + room)
    ref.once('value').then(function(snapshot){
        changeJobs(responsibilitiesJson[snapshot.val().numResidents])
    })

    
    }
    const onPassOrFail = (jobNum, status) => {
        if (users != null && users.length > 0) {
            users.forEach(user => {
                if (user.job == jobNum) {
                    console.log(user.uid + ' ' + status)
                    firebase.database().ref('/users/' + user.uid).update({'pass': status})
                }
            })
        }
        // for (let i = 0; i < uids.length; i++){
        //     firebase.database().ref('/users/' + uids[i]).update(users[i])
        // }
        // console.log(users);
    }
    const onSubmit = () => {
        changeShouldShow(false)
        // console.log('/' + props.apt + 'Rooms/' + room)
        firebase.database().ref('/' + props.apt + 'Rooms/' + room).update({'comments': comments})
    }

    const onChangeComment = text => {
        changeComments(text)
    }

    

    const getJobs = () => {
        changeShouldShow(!shouldShow)
    }
    const getDetails = () => {
        changeShowDetails(!showDetails)
    }

    return (
        <TouchableWithoutFeedback>
        <View style={styles.roomContainer}>
            <Card>
            <Text onPress={getJobs}>Room: {props.room}</Text>
            <View style={styles.gradeSheetContainer}>
                {shouldShow ? jobList : null}
                {shouldShow ? 
                <View style={styles.textAreaContainer} >
                <TextInput
                  style={styles.textArea}
                  placeholder="Comments"
                  placeholderTextColor="grey"
                  numberOfLines={4}
                  multiline={true}
                  onChangeText={(text)=>onChangeComment(text)}
                />
              </View>
                 : null}
                 {shouldShow ? <Button title="Submit" onPress={onSubmit}/> : null}
            </View>
            </Card>
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    textAreaContainer: {
      borderColor: 'grey',
      borderWidth: 1,
      padding: 2
    },
    textArea: {
      height: 150,
      flex: 1
    },
    roomContainer: {
        alignContent: "center",
        paddingHorizontal: 10
    },
    gradeSheetContainer: {
        paddingHorizontal: 15  
    }
  })

export default Room