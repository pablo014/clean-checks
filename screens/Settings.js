import React from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'
import * as firebase from 'firebase'

const Settings = props => {
    
    let newNumResidents = parseInt(props.numResidents, 10) - 1;

    const onDelete = () => {
        firebase.database.ref('/users').child(props.uid).remove()
        firebase.database.ref('/' + props.apt + '/' + props.aptNum).child(props.name).remove()
        firebase.database.ref('/' + props.apt + 'Rooms/' + props.aptNum).update({'numResidents': newNumResidents})
        firebase.auth().currentUser.delete().then(props.isLoggedIn(false))
    }
    return(
        <View>
            <View>
                <Button title="Delete Account" onPress={onDelete} color='#ff0000'/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default Settings