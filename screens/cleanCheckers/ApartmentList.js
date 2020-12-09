import React from 'react'
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native'
import Room from '../../components/Room'
import * as firebase from 'firebase'

const ApartmentList = props => {
    return(
        <View style={styles.listContainer}>
            <SafeAreaView>
                <FlatList 
                data={props.aptList}
                key='key'
                renderItem={({item})=> <View style={styles.roomContainer}><Room room={item} apt={props.apt}/></View>}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical : 20
    },
    roomContainer: {
        paddingVertical: 15
    }
})

export default ApartmentList