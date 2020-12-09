import React, {useState} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
import Fonts from '../constants/fonts'

const RoomJobs = props => {
    const [shouldShow, changeShouldShow] = useState(false)
    let jobString = '';
    // props.details.responsibilities.forEach(job => {
    //     jobString += '\u2022' + job
    // });
    return(
        <View>
            <View>
                <Text>{props.details.name}</Text> <Text style={Fonts.hyperlink} onPress={changeShouldShow(!shouldShow)}>details</Text>
            </View>
            <View>
                <Text>{shouldShow ? jobString : null}</Text>
            </View>
        </View>
    )
}

export default RoomJobs