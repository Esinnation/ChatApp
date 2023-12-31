import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'
import { collection, addDoc } from "firebase/firestore"; 
const AddChat = ({navigation}) => {
  const [input, setinput] = useState('')
  useLayoutEffect(()=>{
    navigation.setOptions({
      title:'Add a new chat',
      headerBackTitle:'Chats',

    })
  },[navigation])
  const createChat =async()=>{
    await addDoc(collection(db, "chats"),{
      chatName:input
    }).then(()=>navigation.goBack())
    .catch((error)=>alert(error.message))
  }
  return (
    <View style={styles.container}>
      <Input
        onSubmitEditing={createChat}
        placeholder='Enter a chat name'
        value={input}
        onChangeText={(text)=>setinput(text)}
        leftIcon={
          <Icon name='wechat' type='antdesing' size={24} color={'black'} />
        }
      />
        <Button disabled={!input} title={'Create new chat'} onPress={createChat}  />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    padding:30,
    height:'100%'
  }
})
export default AddChat
