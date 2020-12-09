import React, {useState} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import ApartmentList from './cleanCheckers/ApartmentList'
import Jobs from './cleanCheckers/Jobs'
import * as firebase from 'firebase'

const CleanChecker = props => {
    const [page, changePage] = useState('list')
    const [aptNum, changeAptNum] = useState('0000')
    const [content, changeContent] = useState()

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
        
    }).then(()=>{
        switch (page) {
            case 'list':
                changeContent(<ApartmentList aptList={aptList} apt={props.apt}/>)
                break;
            case 'jobs' :
                changeContent(<Jobs />)
                break;
        }
    }
    )

    



    return(
        <View>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({

})

export default CleanChecker