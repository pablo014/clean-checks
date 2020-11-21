import React, {useState} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import ApartmentList from './cleanCheckers/ApartmentList'
import Jobs from './cleanCheckers/Jobs'
import * as firebase from 'firebase'

const CleanChecker = props => {
    const [page, changePage] = useState('list')
    const [aptNum, changeAptNum] = useState('0000')

    const onChangePage = (value) => {
        changePage(value)
    }
    const onChangeAptNum = (value) => {
        changeAptNum(value)
    }
    let aptList = [];

    firebase.database().ref(props.apt + 'Rooms').once('value').then((snapshot)=>{
        snapshot.forEach((value)=>{
            aptList.push(value.key)
        })
    })

    let content;

    switch (page) {
        case 'list':
            content = <ApartmentList aptList={aptList}/>
            break;
        case 'jobs' :
            content = <Jobs />
            break;
        default : 
            content = <ApartmentList aptList={aptList}/>
            break;
    }


    return(
        <View>
            <Text>Hello</Text>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({

})

export default CleanChecker