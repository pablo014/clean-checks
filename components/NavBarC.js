import React from 'react'
import {View, StyleSheet} from 'react-native'
import NavBar, {NavButton, NavButtonText, NavTitle} from 'react-native-nav'

const NavbarC = props => {
    return(
        <NavBar >
        <View>
            <NavButton onPress={()=>{props.page('Settings')}}>
                <NavButtonText>{"Settings"}</NavButtonText>
            </NavButton>
        </View>
        <View>
            <NavButton onPress={()=>{props.page('Home')}}>
                <NavButtonText>{"Home"}</NavButtonText>
            </NavButton>
        </View>
        <View>
            <NavButton onPress={()=>{props.page('Job Sign Up')}}>
                <NavButtonText>{"Job Sign Up"}</NavButtonText>
            </NavButton>
        </View>
        <View>
            <NavButton onPress={()=>{props.page('Clean Checks')}}>
                <NavButtonText>{"Clean Check"}</NavButtonText>
            </NavButton>
        </View>
    </NavBar>
    )
}

const styles = StyleSheet.create({
})

export default NavbarC