import { StyleSheet, Text, View,KeyboardAvoidingView} from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Image,Input,Button } from 'react-native-elements'
import { useEffect } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged(authUser=>{
      // console.log(authUser)
      if(authUser){
        navigation.replace('Home')
      }
    })
    return unsubscribe
  },[])
  const signIn=()=>{
    signInWithEmailAndPassword(auth, email, password)
    .catch(error=>alert(error.message))

  }
  return (
    <KeyboardAvoidingView  style={styles.container}>
      <StatusBar style='light' />
      <Image source={require('../assets/Chat.png')} style={{width:100,height:100}} />
      <View style={styles.inputContainer}>
        <Input placeholder='Email' autoFocus type='email' value={email} onChangeText={text=>setEmail(text)}  />
        <Input placeholder='Password' onSubmitEditing={signIn}  type='password' secureTextEntry value={password} onChangeText={text=>setPassword(text)} />
      </View>
      <Button title={'Login'} containerStyle={styles.button} onPress={signIn} />
      <Button title={'Register'} type='outline' containerStyle={styles.button} onPress={()=>navigation.navigate('Register')} />
      <View style={{height:10}} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:10,
    backgroundColor:'white'
  },
  inputContainer:{
    width:300
  },
  button:{
    width:200,
    marginTop:10
  }
})
export default Login
