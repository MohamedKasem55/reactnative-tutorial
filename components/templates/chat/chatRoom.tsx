import { View, Text, Pressable } from 'react-native'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { auth, database } from '../../../config/firebase.config'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
const ChatRoom = () => {
    const [messages, setMessages] = useState<any>([])
    const navigation = useNavigation()
    const onSignout = () => {
        signOut(auth).catch(error => {
        })
    }
    const onSend = useCallback(
        (messages:IMessage[]) => {
            setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages))
            const { _id, createdAt, text, user } = messages[0];
            addDoc(collection(database, "chats"), { _id, createdAt, text, user })
            
        },
        [],
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (<Pressable onPress={onSignout}><Text>Logout</Text></Pressable>)
        })
    }, [navigation])

    useLayoutEffect(() => {
        const collectionRef = collection(database, 'chats')
        const q = query(collectionRef,orderBy('createdAt','desc'))
        const unsubscribe = onSnapshot(q, snapshot => {
            console.log(snapshot.docs[0]);
            
            setMessages(snapshot.docs.map(doc => ({
                _id: doc.id,
                createdAt: doc.data().createdAt,
                text: doc.data().text,
                user: doc.data().user
            })))

        })
        return () => {
            unsubscribe()
        }
    }, [])
    return (
        <GiftedChat 
        messages={messages}
        onSend={(messages:IMessage[])=>onSend(messages)}
        user={{
            _id:auth.currentUser?.email||"",
            avatar:"https://i.pravatar.cc/300"
        }}
        />
    )
}

export default ChatRoom