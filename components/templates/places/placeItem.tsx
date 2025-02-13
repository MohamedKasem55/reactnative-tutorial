import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Place } from './place'

const PlaceItem = (props: { place: Place ,onSelect:()=>void }) => {
    return (
        <Pressable onPress={props.onSelect} >
            <Image source={{uri:props.place.imageUri}}/>
            <View>
                <Text>{props.place.title}</Text>
                <Text>{props.place.address}</Text>
            </View>
        </Pressable>
    )
}

export default PlaceItem

const styles = StyleSheet.create({

})