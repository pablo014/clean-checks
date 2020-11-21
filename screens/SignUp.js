import React, {useState} from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import * as firebase from 'firebase'

const SignUp = props => {
    const [header, changeHeader] = useState('')
    const [res, changeRes] = useState('')
    const [shouldShow, changeShouldShow] = useState(false)
    const [jobNum, changeJobNum] = useState()
    const [currentJobString, changeCurrentJobString] = useState('')

    const onChangeCurrentJobString = (value) => {
        changeCurrentJobString(value)
    }


    const onChangeShouldShow = (value) => {
        changeShouldShow(value)
    }

    const onChangeSubmission = (value) => {
        if(value == 0){
            changeRes('')
            changeHeader('')
            onChangeShouldShow(false)
        }
        else {
            changeHeader('Here are the responsibilities of Job ' + value + ':')
            for (let i = 0; i < jobs[value].responsibilities.length; i++){
                content += '\u2022' + jobs[value].responsibilities[i] + '\n'
            }
            changeRes(content)
            onChangeShouldShow(true)
        }
        changeJobNum(value)
    }

    const onSubmit = () => {
        firebase.database().ref(props.apt + '/' + props.aptNum + '/' + props.name).update({'job': jobNum})
        firebase.database().ref('/users/' + props.userId).update({'job': jobNum})
        props.movePage('Home');
    }
    
    const jobs = JSON.parse(props.jobs)
    let jobProps = [];
    let content = '';
    

    let submission = <Button title="Submit" onPress={()=>{onSubmit()}}/>;
    for (let i = 1; i < jobs.length; i++){
        jobProps.push({label: 'Job ' + i + ': ' + jobs[i].name, value: i})
    }

    firebase.database().ref(props.apt + '/' + props.aptNum).once('value').then((snapshot)=>{
        let jobArray = [];
        let jobString = '';
        snapshot.forEach((value)=>{
            if (parseInt(value.val().job)) {
                jobArray[parseInt(value.val().job) - 1] = value.val().name
            }
        })
        for (let i = 0; i < jobs.length - 1; i++){
            jobString += '\u2022' + 'Job ' + (i + 1) + ': ' 
            if (jobArray[i]) {
                jobString += jobArray[i]
            }
            else {
                jobString += 'Unassigned'
            }
            jobString += '\n'
        }
        onChangeCurrentJobString(jobString)
    })

    return(
        <View>
            <Text>Job Sign Up</Text>
            <RadioForm 
            radio_props={jobProps}
            initial="-1"
            onPress={(value)=>{onChangeSubmission(value)}}/>
            <Text>{currentJobString}</Text>
            <View>
                <Text>{header}</Text>
                <Text>{res}</Text>
                <View>{shouldShow ? submission : null}</View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({

})

export default SignUp