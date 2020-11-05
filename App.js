import React, {useState} from "react";
import {
  Button,
  StyleSheet,
  Text,
  View
} from "react-native";
import Title from './components/header'
import Login from './screens/Login'
import Colors from './constants/colors'
import Register from './screens/Register'
import Main from './screens/Main'
import * as firebase from 'firebase'
import apiKeys from "./constants/apiKeys";

export default function App() {

  //initialize firebase
  if (!firebase.apps.length) { firebase.initializeApp(apiKeys.firebaseConfig) }

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  

  const startLogin = (login) => {
    setIsLoggedIn(login)
  }

  const startRegister = (register) => {
    setIsRegister(register)
  }

  

  let content = <Login register={startRegister} isLoggedIn={startLogin}/>
  if(isRegister) {
    content = <View style={styles.container}><Register toLogin={startRegister} toMain={startLogin}/></View>
  }
  else if(isLoggedIn) {
    content = <Main />
  }
  else {
    content =<View style={styles.container}><Login register={startRegister} isLoggedIn={startLogin}/></View> 
  }

  return (
    content
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background
  },
  title: {
    fontFamily: "Cochin",
    fontSize: 20,
    fontWeight: "bold",
  },
});