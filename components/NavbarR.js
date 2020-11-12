import React from 'react'
import {View, StyleSheet, Button} from 'react-native'
import NavBar, {NavButton, NavButtonText, NavTitle} from 'react-native-nav'

const NavbarR = props => {
    return(
        <View>
    <NavBar>
        <View>
            <NavButton onPress={()=>{props.page('Settings')}}>
                <NavButtonText >{"Settings"}</NavButtonText>
            </NavButton>
        </View>
        <View>
            <NavButton onPress={()=>{props.page('Home')}}>
                <NavButtonText >{"Home"}</NavButtonText>
            </NavButton>
        </View>
        <View>
            <NavButton onPress={()=>{props.page('Job Sign Up')}}>
                <NavButtonText >{"Job Sign Up"}</NavButtonText>
            </NavButton>
        </View>
    </NavBar>
    </View>
    )
}

const styles = new StyleSheet.create({
    nav: {
        backgroundColor: '#f5f5f5',
    }
})

export default NavbarR