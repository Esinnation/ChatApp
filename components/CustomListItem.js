import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import { ListItem,Avatar } from 'react-native-elements'
import { db } from '../firebase'
import {doc,orderBy,onSnapshot,collection,query} from "firebase/firestore";

const CustomListItem = ({id,chatName,enterChat}) => {
  const [messages,setMessages]=useState([])
  useEffect(()=>{
    const docRef=doc(db, "chats",id)
    const q= query(collection(docRef,'messages'),orderBy('timestamp','desc'))
    const unsubscribe= onSnapshot(q,(snapshot)=>{
      setMessages(snapshot.docs.map(doc=>doc.data()))
    })
    return unsubscribe
  },[])
  return (
    <ListItem onPress={()=>enterChat(id,chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{uri:messages?.[0]?.photoURL ||
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}}
      />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight:'800'}}> {chatName} </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          {messages?.[0]?.displayName}: {messages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})