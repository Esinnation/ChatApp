import { StyleSheet, View,KeyboardAvoidingView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Input , Text,} from 'react-native-elements'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword,updateProfile} from "firebase/auth";

const Register = ({navigation}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  // useLayoutEffect(()=>{ 
  //   navigation.setOptions({
  //     headerBackTitle:'ABC'
  //   })
  // },[navigation])
  const register=async()=>{
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user,{
      displayName:name,
      photoURL:imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
    })
    .catch(error=>alert(error.message))
      }
  return (
    <KeyboardAvoidingView  style={styles.container}>
      <StatusBar style='light' />
      <Text h3 style={{marginBottom:50}}>
        Create an account
      </Text>
      <View style={styles.inputContainer}>
        <Input 
          placeholder='Full Name'  
          type='text' 
          value={name} 
          onChangeText={text=>setName(text)}
        />
        <Input 
          placeholder='Email'  
          type='email' 
          value={email} 
          onChangeText={text=>setEmail(text)}
        />
        <Input 
          placeholder='Password'   
          type='text' 
          value={password}
          secureTextEntry 
          onChangeText={text=>setPassword(text)}
        />
        <Input 
          placeholder='Profile Picture URL (Optional)'  
          type='text' 
          value={imageUrl} 
          onChangeText={text=>setImageUrl(text)}
          onSubmitEditing={register}
        />
        <Button style={styles.button} title={'Register'} onPress={register} raised />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    backgroundColor:'white'
  },
  inputContainer:{
    width:300,
  },
  button:{
    width:200,
    marginTop:10
  },
})
export default Register
